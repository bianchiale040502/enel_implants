import React, { useState, useEffect, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const NavigationContext = createContext();

const LOGGED_OUT_ADMIN = {
    username: null,
    password: null
}

export const NavigationProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [admin, setUser] = useState(LOGGED_OUT_ADMIN);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/signIn/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    group: 'Admins'
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setIsLoggedin(true);
                return { success: true, error: null, code: null };
            } else {
                const errorData = await response.json();
                setToken(null);
                localStorage.removeItem('token');
                setIsLoggedin(false);
                setUser(LOGGED_OUT_ADMIN);
                return {
                    success: false,
                    error: errorData.error,
                    code: errorData.code
                };
            }
        } catch (error) {
            setToken(null);
            localStorage.removeItem('token');
            setIsLoggedin(false);
            setUser(LOGGED_OUT_ADMIN);
            return {
                success: false,
                error: 'Errore durante il login. Riprova più tardi.',
                code: null
            };
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedin(false);
        setUser(LOGGED_OUT_ADMIN);
        setShowLogoutDialog(false);
    }

    useEffect(() => {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            setIsLoggedin(true);
        }

        if (savedToken && isLoggedin && (location.pathname !== '/')) {
            navigate('/')
        }

    }, [token, isLoggedin, location.pathname]);

    return (
        <NavigationContext.Provider value=
            {{
                admin,
                token,
                isLoggedin,
                showLogoutDialog,
                setShowLogoutDialog,
                login,
                logout
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}