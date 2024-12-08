// import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function SnackbarAddUpgradeDelet({
    showAlertSnackBar,
    setShowAlertSnackBar,
    alertSnackBar,
    // setAlertSnackBar
}) {

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlertSnackBar(false);
    };

    return (
        <Snackbar open={showAlertSnackBar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert
                onClose={handleCloseSnackbar}
                severity={alertSnackBar ? 'success' : 'error'}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertSnackBar ? 'Operazione eseguita con successo' : 'Errore nell\'esecuzione del comando'}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAddUpgradeDelet;