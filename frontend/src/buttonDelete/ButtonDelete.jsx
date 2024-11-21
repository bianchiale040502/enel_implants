import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

function ButtonDelete({
    selectEnelImplant,
    enelImplants,
    enelImplant
}) {

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

                    // Se usi il token di autenticazione
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                selectEnelImplant(enelImplants.filter(imp => imp.id !== id));
                console.log(`Implant con ID ${id} eliminato con successo`);
            } else {
                console.error('Errore durante l\'eliminazione:', response.statusText);
            }

        } catch (error) {
            console.error('Si è verificato un errore:', error);
        }
    };

    return (
        <React.Fragment>
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
                    {`Eliminazione del record di ${enelImplant.name}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sicuro di voler cancellare il record dell'impianto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annulla</Button>
                    <Button onClick={() => handleDelete(enelImplant.id)} autoFocus>
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ButtonDelete