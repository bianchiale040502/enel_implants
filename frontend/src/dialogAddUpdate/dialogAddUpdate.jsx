import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Switch,
    FormControlLabel,
    FormControl,
    FormHelperText,
    Select,
    MenuItem,
    InputLabel,
    Alert,
    Snackbar
} from '@mui/material';
import { useState } from 'react';
// import SnackbarAddUpgradeDelet from '../snackbarAddUpgradeDelet/SnackbarAddUpgradeDelet';

const COUNTRIES = [
    "Italia",
    "Spagna",
    "Grecia",
    "Germania",
    "Stati Uniti",
    "Canada",
    "Messico",
    "Panama",
    "Guatemala",
    "Costa Rica",
    "Cile",
    "Brasile",
    "Colombia",
    "Argentina",
    "Marocco",
    "Sudafrica",
    "Zambia",
    "Australia",
    "India"
];

const CATEGORIES = [
    "Termoelettrico",
    "Idroelettrico",
    "Geotermico",
    "Eolico",
    "Fotovoltaico",
    "Nucleare"
];

function DialogAddUpdate({
    enelImplants,
    selectEnelImplant,
    open,
    openChange,
    currentImpianto,
    currentImpiantoChange,
    isEditing,
}) {
    const [nameImplantError, setNameImplantError] = useState(false);
    const [nameImplantErrorMessage, setNameImplantErrorMessage] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [categoryErrorMessage, setCategoryErrorMessage] = useState('');
    const [countryError, setCountryError] = useState(false);
    const [countryErrorMessage, setCountryErrorMessage] = useState('');
    const [showAlertSnackBar, setShowAlertSnackBar] = useState(false);
    const [alertSnackBar, setAlertSnackBar] = useState(false);

    function handleClose() {
        openChange(false);
        setNameImplantError(false);
        setNameImplantErrorMessage('');
        setCategoryError(false);
        setCategoryErrorMessage('');
        setCountryError(false);
        setCountryErrorMessage('');
    };

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        currentImpiantoChange(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                type === 'number' ? Number(value) : value
        }));
    };

    function validateInputs() {

        let isValid = true;

        if (!currentImpianto.implant_name || currentImpianto.implant_name.trim() === '') {
            setNameImplantError(true);
            setNameImplantErrorMessage('Il nome è obbligatorio');
            isValid = false;
        } else {
            setNameImplantError(false);
            setNameImplantErrorMessage('');
        }

        if (!currentImpianto.category) {
            setCategoryError(true);
            setCategoryErrorMessage('La categoria è obbligatoria');
            isValid = false;
        } else {
            setCategoryError(false);
            setCategoryErrorMessage('');
        }

        if (!currentImpianto.country) {
            setCountryError(true);
            setCountryErrorMessage('Il paese è obbligatorio');
            isValid = false;
        } else {
            setCountryError(false);
            setCountryErrorMessage('');
        }

        return isValid;
    }

    async function handleAdd() {

        if (!validateInputs()) return;

        const today = new Date().getTime();
        const newImpianto = {
            ...currentImpianto,
            dateLastUpdate: today
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/api/implants/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newImpianto),
            });
            const data = await response.json();
            if (response.ok) {
                selectEnelImplant([...enelImplants, data]);
                setAlertSnackBar(true);
                openChange(false);
            } else {
                setAlertSnackBar(false);
                openChange(false);
                // throw new Error('Errore durante l\'aggiunta dell\'impianto');
            }
        } catch (error) {
            setAlertSnackBar(false);
            openChange(false);
        } finally {
            setShowAlertSnackBar(true)
        }
    };

    async function handleEdit() {

        if (!validateInputs()) return;

        const today = new Date().getTime();
        currentImpianto.dateLastUpdate = today;

        try {
            const response = await fetch(`http://127.0.0.1:8080/api/implants/${currentImpianto.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(currentImpianto),
            });
            const data = await response.json();
            if (response.ok) {
                selectEnelImplant(
                    enelImplants.map(imp =>
                        imp.id === data.id ? data : imp
                    )
                );
                setAlertSnackBar(true);
            } else {
                setAlertSnackBar(false);
                throw new Error('Errore durante l\'aggiunta dell\'impianto');
            }
        } catch (error) {
            setAlertSnackBar(false);
        } finally {
            openChange(false);
            setShowAlertSnackBar(true);
        };
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlertSnackBar(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isEditing ? 'Modifica Impianto' : 'Aggiungi Nuovo Impianto'}
                </DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        name="implant_name"
                        label="Nome"
                        fullWidth
                        value={currentImpianto.implant_name || ''}
                        onChange={handleChange}
                        required
                        error={nameImplantError}
                        helperText={nameImplantErrorMessage}
                    />

                    <FormControl
                        fullWidth
                        margin="dense"
                        error={categoryError}
                        required
                    >
                        <InputLabel>Tipo di impianto</InputLabel>
                        <Select
                            margin="dense"
                            name="category"
                            label="Tipo di impianto"
                            value={currentImpianto.category || ''}
                            onChange={handleChange}
                        >
                            {CATEGORIES.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        {categoryError &&
                            <FormHelperText>
                                {categoryErrorMessage}
                            </FormHelperText>
                        }
                    </FormControl>

                    <FormControl
                        fullWidth
                        margin="dense"
                        error={countryError}
                        required
                    >
                        <InputLabel>Paese</InputLabel>
                        <Select
                            name="country"
                            label="Paese"
                            value={currentImpianto.country || ''}
                            onChange={handleChange}
                        >
                            {COUNTRIES.map((country, index) => (
                                <MenuItem key={index} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                        {countryError &&
                            <FormHelperText>
                                {countryErrorMessage}
                            </FormHelperText>
                        }
                    </FormControl>

                    <TextField
                        margin="dense"
                        name="rated_power"
                        label="Potenza Nominale (MW)"
                        type="number"
                        fullWidth
                        value={currentImpianto.rated_power}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="num_unita_presenti"
                        label="Numero Unità"
                        type="number"
                        fullWidth
                        value={currentImpianto.num_unita_presenti}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="num_unita_operativi"
                        label="Numero Unità Operative"
                        type="number"
                        fullWidth
                        value={currentImpianto.num_unita_operativi}
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentImpianto.operability}
                                onChange={handleChange}
                                name="operability"
                                color="primary"
                            />
                        }
                        label="Operabilità"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentImpianto.availability}
                                onChange={handleChange}
                                name="availability"
                                color="primary"
                            />
                        }
                        label="Disponibilità"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button
                        onClick={isEditing ? handleEdit : handleAdd}
                        color="primary"
                    >
                        {isEditing ? 'Salva' : 'Aggiungi'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <SnackbarAddUpgradeDelet
                showAlertSnackBar={showAlertSnackBar}
                setShowAlertSnackBar={setShowAlertSnackBar}
                alertSnackBar={alertSnackBar}
                setAlertSnackBar={setAlertSnackBar}
            /> */}
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
        </>
    );
}

export default DialogAddUpdate