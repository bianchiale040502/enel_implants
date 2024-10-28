import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import logo from '../assets/images/logo-enel.png'
import { colors } from '@mui/material';

const pages = [
    {
        id: 1,
        title: 'FilterableImplantsTable',
        path: '/',
        icon: <></>
    },
    {
        id: 2,
        title: 'Add implant',
        path: '/addImplants',
        icon: <></>
    },
]

function Header() {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="logo" style={{ height: '48px', width: 'auto' }} />
                </Toolbar >
            </Container>
        </AppBar>
    )
}

export default Header