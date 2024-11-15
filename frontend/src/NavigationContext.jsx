import * as React from 'react';
import { createContext, useState } from "react";
import { useNavigate, useLocation, redirect } from 'react-router-dom';

export const NavigationContext = createContext();

const LOGGED_OUT_ADMIN = {
    username: null,
    password: null
}

export const NavigationProvider = ({ children }) => {

    const [isLoggedin, setIsLoggedin] = React.useState(false);
    const [admin, setUser] = useState(LOGGED_OUT_ADMIN);

    const navigate = useNavigate();
    const location = useLocation();

    const urlSignIn = location.pathname === '/signIn';

    function login(username, password) {

        //mockup
        const LOGGED_IN_ADMIN = {
            username: 'ale',
            password: '1'
        }

        const USERNAME = 'ale';
        const PASSWORD = '1'

        if (username == USERNAME && password == PASSWORD) {
            setUser(LOGGED_IN_ADMIN)
            navigate('/')
            setIsLoggedin(true)
            console.log('Login effettuato')
        } else {
            console.log('Credenziali errate')
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