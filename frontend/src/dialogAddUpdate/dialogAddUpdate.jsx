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
    Tooltip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { useContext, useState } from 'react';
import { SnackBarContext } from '../contextFiles/SnackBarContext';
import SnackbarAddUpgradeDelet from '../snackbarAddUpgradeDelet/snackbarAddUpgradeDelet';

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
    setCurrentImpianto,
    isEditing,
}) {
    const [nameImplantError, setNameImplantError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [numUnitObbError, setNumUnitObbError] = useState(false);
    const [operabilitytError, setOperabilityError] = useState(false);
    const [numUnitError, setNumUnitError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [operabilityErrorMessage, setOperabilityErrorMessage] = useState('');
    const [numUnitErrorMessage, setNumUnitErrorMessage] = useState('');

    const { snackbarState, setSnackbarState } = useContext(SnackBarContext);

    function handleClose() {
        openChange(false);
        setNameImplantError(false);
        setCategoryError(false);
        setCountryError(false);
        setNumUnitObbError(false);
        setOperabilityError(false);
        setNumUnitError(false);
        setErrorMessage('');
        setOperabilityErrorMessage('');
        setNumUnitErrorMessage('')
    };

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setCurrentImpianto(prev => {

            const updatedImpianto = {
                ...prev,
                [name]: type === 'checkbox' ? checked :
                    type === 'number' ? Number(value) : value.trim()
            };

            if (name === 'num_unita_operativi' &&
                updatedImpianto.num_unita_operativi <= updatedImpianto.num_unita_presenti) {
                setNumUnitError(false);
                setNumUnitErrorMessage('');
            }

            if (name === 'rated_power' && updatedImpianto.rated_power > 0) {
                setOperabilityError(false);
                setOperabilityErrorMessage('');
            }

            if (name === 'availability' && !checked) {
                updatedImpianto.operability = false;
                updatedImpianto.rated_power = 0;
                updatedImpianto.num_unita_operativi = 0;
                setOperabilityError(false);
                setNumUnitError(false);
                setOperabilityErrorMessage('');
                setNumUnitErrorMessage('');
            }

            if (name === 'operability' && !checked) {
                updatedImpianto.rated_power = 0;
                updatedImpianto.num_unita_operativi = 0;
                setOperabilityError(false);
                setNumUnitError(false);
                setOperabilityErrorMessage('');
                setNumUnitErrorMessage('');
            }

            return updatedImpianto;
        });
    };

    function validateInputs() {

        let isValid = true;

        if (!currentImpianto.implant_name || currentImpianto.implant_name.trim() === '') {
            setNameImplantError(true);
            setErrorMessage('Campo obbligatorio');
            isValid = false;
        } else {
            setNameImplantError(false);
            setErrorMessage('');
        }

        if (!currentImpianto.category) {
            setCategoryError(true);
            setErrorMessage('Campo obbligatorio');
            isValid = false;
        } else {
            setCategoryError(false);
            setErrorMessage('');
        }

        if (!currentImpianto.country) {
            setCountryError(true);
            setErrorMessage('Campo obbligatorio');
            isValid = false;
        } else {
            setCountryError(false);
            setErrorMessage('');
        }

        if (currentImpianto.num_unita_presenti <= 0) {
            setNumUnitObbError(true);
            setErrorMessage('Campo obbligatorio');
            isValid = false;
        } else {
            setNumUnitObbError(false);
            setErrorMessage('');
        }

        if (currentImpianto.operability && currentImpianto.rated_power === 0) {
            setOperabilityError(true);
            setOperabilityErrorMessage('Campo obbligatorio quando l\'impianto è operativo.');
            isValid = false;
        } else {
            setOperabilityError(false);
            setOperabilityErrorMessage('');
        }

        if (currentImpianto.num_unita_operativi > currentImpianto.num_unita_presenti) {
            setNumUnitError(true);
            setNumUnitErrorMessage('Le unità operative non possono superare le unità presenti.');
            isValid = false;
        } else if (currentImpianto.operability && currentImpianto.num_unita_operativi === 0) {
            setNumUnitError(true);
            setNumUnitErrorMessage('Campo obbligatorio quando l\'impianto è operativo.');
            isValid = false;
        } else {
            setNumUnitError(false);
            setNumUnitErrorMessage('');
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
                setSnackbarState({
                    open: true,
                    severity: 'success',
                    message: 'Impianto aggiunto con successo',
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
                message: 'Errore nell\'esecuzione del comando',
            });
        } finally {
            openChange(false);
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
                setSnackbarState({
                    open: true,
                    severity: 'success',
                    message: 'Impianto modificato con successo',
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
                message: 'Errore nell\'esecuzione del comando',
            });
        } finally {
            openChange(false);
        }
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
                        helperText={nameImplantError ? errorMessage : ''}
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
                            {CATEGORIES.sort().map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        {categoryError &&
                            <FormHelperText>
                                {errorMessage}
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
                            margin="dense"
                            name="country"
                            label="Paese"
                            value={currentImpianto.country || ''}
                            onChange={handleChange}
                        >
                            {COUNTRIES.sort().map((country, index) => (
                                <MenuItem key={index} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                        {countryError &&
                            <FormHelperText>
                                {errorMessage}
                            </FormHelperText>
                        }
                    </FormControl>

                    <TextField
                        margin="dense"
                        name="num_unita_presenti"
                        label="Numero Unità"
                        type="number"
                        required
                        fullWidth
                        value={currentImpianto.num_unita_presenti}
                        onChange={handleChange}
                        error={numUnitObbError}
                        helperText={numUnitObbError ? errorMessage : ''}
                    />

                    <Tooltip title={currentImpianto.availability && currentImpianto.operability ? '' : 'Impianto opertivo necessario'}>
                        <span>
                            <TextField
                                margin="dense"
                                name="num_unita_operativi"
                                label="Numero Unità Operative"
                                type="number"
                                fullWidth
                                value={currentImpianto.num_unita_operativi}
                                onChange={handleChange}
                                disabled={!currentImpianto.availability || !currentImpianto.operability}
                                error={numUnitError}
                                helperText={numUnitError ? numUnitErrorMessage : ''}
                            />
                        </span>
                    </Tooltip>

                    <Tooltip title={currentImpianto.availability && currentImpianto.operability ? '' : 'Impianto opertivo necessario'}>
                        <span>
                            <TextField
                                margin="dense"
                                name="rated_power"
                                label="Potenza Nominale (MW)"
                                type="number"
                                fullWidth
                                value={currentImpianto.rated_power}
                                onChange={handleChange}
                                disabled={!currentImpianto.availability || !currentImpianto.operability}
                                error={operabilitytError}
                                helperText={operabilitytError ? operabilityErrorMessage : ''}
                            />
                        </span>
                    </Tooltip>


                    <Tooltip title={currentImpianto.availability ? '' : 'Disponibilità impianto necessario'}>
                        <span>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentImpianto.operability || false}
                                        onChange={handleChange}
                                        name="operability"
                                        color="primary"
                                        disabled={!currentImpianto.availability}
                                    />
                                }
                                label="Operabilità"
                            />
                        </span>
                    </Tooltip>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentImpianto.availability || false}
                                onChange={handleChange}
                                name="availability"
                                color="primary"
                            />
                        }
                        label="Disponibilità"
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClose}
                    >
                        Annulla
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={isEditing ? handleEdit : handleAdd}
                    >
                        Salva
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

export default DialogAddUpdate