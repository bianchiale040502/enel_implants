import { useContext } from 'react';
import { NavigationContext } from '../contextFiles/NavigationContext';

import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from '@mui/material';

function AlertDialogLogout() {

    const { showLogoutDialog, setShowLogoutDialog, logout } = useContext(NavigationContext)

    function cancelLogout() {
        setShowLogoutDialog(false);
    };

    function confirmLogout() {
        setShowLogoutDialog(false);
        logout();
    }

    return (
        <Dialog open={showLogoutDialog} onClose={cancelLogout}>
            <DialogTitle>Sei sicuro di voler uscire?</DialogTitle>
            <DialogActions>
                <Button onClick={cancelLogout} color="primary">
                    Annulla
                </Button>
                <Button onClick={confirmLogout} color="secondary">
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialogLogout