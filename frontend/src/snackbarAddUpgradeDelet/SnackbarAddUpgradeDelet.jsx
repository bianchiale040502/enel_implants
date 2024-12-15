import {
    Snackbar,
    Alert
} from '@mui/material';
import { useState, useEffect } from 'react';

function SnackbarAddUpgradeDelet({
    snackbarState,
    setSnackbarState
}) {

    function handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState(prevState => ({
            ...prevState,
            open: false,
        }));
    }

    return (
        <Snackbar
            open={snackbarState.open}
            autoHideDuration={1500}
            onClose={handleCloseSnackbar}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAddUpgradeDelet;