import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert
} from '@mui/material';
import { useState } from 'react';
// import SnackbarAddUpgradeDelet from '../snackbarAddUpgradeDelet/SnackbarAddUpgradeDelet';

function ButtonDelete({
    selectEnelImplant,
    enelImplants,
    enelImplant
}) {

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        severity: 'success',
        message: '',
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/implants/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            // const data = await response.json();
            // console.log(data)
            if (response.ok) {
                selectEnelImplant(enelImplants.filter(imp => imp.id !== id));
                await new Promise(resolve => setTimeout(resolve, 100));
                setSnackbarState({
                    open: true,
                    severity: 'success',
                    message: 'Operazione eseguita con successo',
                });
            } else {
                setSnackbarState({
                    open: true,
                    severity: 'error',
                    message: 'Errore nell\'esecuzione del comando',
                });
            }
        } catch (error) {
            setSnackbarState({
                open: true,
                severity: 'error',
                message: 'Si è verificato un errore durante l\'eliminazione',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarState(prev => ({ ...prev, open: false }));
    };

    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
            >
                Elimina
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Eliminazione del record di ${enelImplant.implant_name}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sicuro di voler cancellare il record dell'impianto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annulla</Button>
                    <Button onClick={() => handleDelete(enelImplant.id)}>
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarState.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarState.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ButtonDelete