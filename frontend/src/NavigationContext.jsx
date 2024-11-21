import * as React from 'react';
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const NavigationContext = createContext();

const LOGGED_OUT_ADMIN = {
    username: null,
    password: null
}

export const NavigationProvider = ({ children }) => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [admin, setUser] = useState(LOGGED_OUT_ADMIN);
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
                navigate('/');
                setIsLoggedin(true);
                return true;
            } else {
                const errorData = await response.json();
                // console.log(errorData.error || 'Utente non trovato');
                setIsLoggedin(false);
                setUser(LOGGED_OUT_ADMIN);
                return false;
            }
        } catch (error) {
            const errorData = await response.json();
            // console.log('Errore durante il login. Riprova più tardi.');
            setIsLoggedin(false);
            setUser(LOGGED_OUT_ADMIN);
            return false;
        }
    }

    function logout() {
        setIsLoggedin(false);
        setUser(LOGGED_OUT_ADMIN);
    }

    return (
        <NavigationContext.Provider value=
            {{
                admin,
                isLoggedin,
                setIsLoggedin,
                login,
                logout
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}