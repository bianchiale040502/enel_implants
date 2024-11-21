import React, { useEffect, useContext } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Container
} from '@mui/material';

import {
    useNavigate,
    useLocation
} from 'react-router-dom';

import { NavigationContext } from '../NavigationContext.jsx';
import logo from '../assets/images/logo-enel.png'

function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const urlHome1 = location.pathname === '/';
    const urlHome2 = location.pathname === '/home';
    const urlSignIn = location.pathname === '/signIn';

    const {
        isLoggedin,
        logout
    } = useContext(NavigationContext);

    useEffect(() => {
        if (urlSignIn) {
            logout();
        }
    }, [urlSignIn, logout]);

    function goSignInView() {
        navigate('/signIn')
    }

    function outSignInView() {
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }} >
                        <img src={logo} alt="logo" style={{ height: '48px', width: 'auto' }} />
                    </Box>
                    {(urlHome1 || urlHome2) && !isLoggedin ? (
                        <Button
                            onClick={goSignInView}
                            sx={{ backgroundColor: "white" }}
                        >
                            Entra come admin
                        </Button>
                    ) : (!urlHome1 || !urlHome2) && !isLoggedin ? (
                        <Button
                            onClick={outSignInView}
                            sx={{ backgroundColor: "white" }}
                        >
                            Home
                        </Button>
                    ) : (!urlHome1 || !urlHome2) && isLoggedin ? (
                        <Button
                            onClick={logout}
                            sx={{ backgroundColor: "white" }}
                        >
                            Logout
                        </Button>
                    ) : null}
                </Toolbar >
            </Container>
        </AppBar>
    )
}

export default Header