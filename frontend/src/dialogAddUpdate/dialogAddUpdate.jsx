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
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';

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

    function handleClose() {
        openChange(false);
    };

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        currentImpiantoChange(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                type === 'number' ? Number(value) : value
        }));
    };

    async function handleAdd() {

        const today = new Date().getTime();

        const newImpianto = {
            ...currentImpianto,
            dateLastUpdate: today
        };

        // console.log('Dati inviati per aggiunta:', JSON.stringify(newImpianto));

        fetch('http://127.0.0.1:8080/api/implants/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newImpianto),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante l\'aggiunta dell\'impianto');
                }
                return response.json();
            })
            .then(data => {
                selectEnelImplant([...enelImplants, data]);
                openChange(false);
            })
            .catch(error => {
                console.error('Errore:', error);
            });
    };

    async function handleEdit() {
        fetch(`http://127.0.0.1:8080/api/implants/${currentImpianto.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(currentImpianto),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante la modifica dell\'impianto');
                }
                return response.json();
            })
            .then(data => {
                selectEnelImplant(
                    enelImplants.map(imp =>
                        imp.id === data.id ? data : imp
                    )
                );
                openChange(false);
            })
            .catch(error => {
                console.error('Errore:', error);
            });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {isEditing ? 'Modifica Impianto' : 'Aggiungi Nuovo Impianto'}
            </DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Nome"
                    fullWidth
                    value={currentImpianto.name}
                    onChange={handleChange}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Tipo di impianto</InputLabel>
                    <Select
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
                </FormControl>

                <FormControl fullWidth margin="dense">
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
    );
}

export default DialogAddUpdate