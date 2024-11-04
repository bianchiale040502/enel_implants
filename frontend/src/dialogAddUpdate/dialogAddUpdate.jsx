import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Switch,
    FormControlLabel
} from '@mui/material';
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

    function handleAdd () {
        const newImpianto = {
            ...currentImpianto,
            id: enelImplants.length + 1
        };
        selectEnelImplant([...enelImplants, newImpianto]);
        openChange(false);
    };

    function handleEdit() {
        selectEnelImplant(enelImplants.map(imp =>
            imp.id === currentImpianto.id ? currentImpianto : imp
        ));
        openChange(false);
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
                <TextField
                    margin="dense"
                    name="category"
                    label="Tipo di impianto"
                    fullWidth
                    value={currentImpianto.category}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="country"
                    label="Paese"
                    fullWidth
                    value={currentImpianto.country}
                    onChange={handleChange}
                />
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
    )

}

export default DialogAddUpdate