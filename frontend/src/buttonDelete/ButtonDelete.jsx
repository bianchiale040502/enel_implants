import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useContext } from 'react';
import { SnackBarContext } from '../contextFiles/SnackBarContext';
import SnackbarAddUpgradeDelet from '../snackbarAddUpgradeDelet/snackbarAddUpgradeDelet';

function ButtonDelete({
    selectEnelImplant,
    enelImplants,
    enelImplant,
}) {

    const [open, setOpen] = React.useState(false);
    const { snackbarState, setSnackbarState } = useContext(SnackBarContext);

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
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                selectEnelImplant(enelImplants.filter(imp => imp.id !== id));
                setSnackbarState({
                    open: true,
                    severity: 'success',
                    message: 'Eliminazione eseguita con successo',
                });
            } else {
                setSnackbarState({
                    open: true,
                    severity: 'error',
                    message: "Errore nell'esecuzione del comando",
                });
            }
        } catch (error) {
            setSnackbarState({
                open: true,
                severity: 'error',
                message: "Errore nell'esecuzione del comando",
            });
        }
    }

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpen}
                startIcon={<DeleteIcon />}
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
            <SnackbarAddUpgradeDelet
                snackbarState={snackbarState}
                setSnackbarState={setSnackbarState}
            />
        </>
    );
}

export default ButtonDelete