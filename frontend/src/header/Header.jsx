import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationContext } from '../NavigationContext.jsx';

import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Container
} from '@mui/material';

import AlertDialogLogout from '../alertDialogLogout/AlertDialogLogout.jsx';
import logo from '../assets/images/logo-enel.png'

function Header() {

    const location = useLocation();
    const navigate = useNavigate();

    const urlHome1 = location.pathname === '/';
    const urlHome2 = location.pathname === '/home';
    const urlSignIn = location.pathname === '/signIn';

    const { token, isLoggedin, setShowLogoutDialog } = useContext(NavigationContext);

    function goSignInView() {
        navigate('/signIn')
    }

    function outSignInView() {
        navigate('/')
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1 }} >
                            <img src={logo} alt="logo" style={{ height: '48px', width: 'auto' }} />
                        </Box>
                        {(urlHome1 || urlHome2) && !isLoggedin && !urlSignIn ? (
                            <Button
                                onClick={goSignInView}
                                sx={{ backgroundColor: "white" }}
                            >
                                Entra come admin
                            </Button>
                        ) : (!urlHome1 || !urlHome2) && urlSignIn ? (
                            <Button
                                onClick={outSignInView}
                                sx={{ backgroundColor: "white" }}
                            >
                                Home
                            </Button>
                        ) : (!urlHome1 || !urlHome2) && isLoggedin && !urlSignIn ? (
                            <Button
                                onClick={() => setShowLogoutDialog(true)}
                                sx={{ backgroundColor: "white" }}
                            >
                                Logout
                            </Button>
                        ) : null}
                    </Toolbar >
                </Container>
            </AppBar>
            <AlertDialogLogout />
        </>
    )
}

export default Header;