import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const NavigationContext = createContext();

const LOGGED_OUT_ADMIN = {
    username: null,
    password: null
}

export const NavigationProvider = ({ children }) => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [admin, setUser] = useState(LOGGED_OUT_ADMIN);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const navigate = useNavigate();

    function goSignInView() {
        navigate('/signIn')
    }

    function outSignInView() {
        navigate('/')
    }

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
                navigate('/');
                setIsLoggedin(true);
                return { success: true, error: null, code: null };
            } else {
                const errorData = await response.json();
                setIsLoggedin(false);
                setUser(LOGGED_OUT_ADMIN);
                return {
                    success: false,
                    error: errorData.error,
                    code: errorData.code
                };
            }
        } catch (error) {
            setIsLoggedin(false);
            setUser(LOGGED_OUT_ADMIN);
            return {
                success: false,
                error: 'Errore durante il login. Riprova più tardi.',
                code: null
            };
        }
    }

    function logout() {
        setIsLoggedin(false);
        setUser(LOGGED_OUT_ADMIN);
        localStorage.removeItem('token');
        setShowLogoutDialog(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedin(true);
        }
    }, []);

    return (
        <NavigationContext.Provider value=
            {{
                admin,
                isLoggedin,
                setIsLoggedin,
                showLogoutDialog,
                setShowLogoutDialog,
                goSignInView,
                outSignInView,
                login,
                logout
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}