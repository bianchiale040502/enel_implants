import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ButtonAddUpgrade({
    enelImplant,
    openChange,
    setCurrentImpianto,
    isEditingChange
}) {
    const handleOpen = (enelImplant) => {
        if (enelImplant) {
            isEditingChange(true);
            setCurrentImpianto(enelImplant);
        } else {
            isEditingChange(false);
            setCurrentImpianto({
                implant_name: "",
                category: "",
                country: "",
                rated_power: 0,
                num_unita_presenti: 1,
                num_unita_operativi: 0,
                operability: true,
                availability: true
            });
        }
        openChange(true);
    };
    return (
        <>
            {enelImplant ? (
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(enelImplant)}
                >
                    Modifica
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ mb: 2 }}
                >
                    Aggiungi Nuovo Impianto
                </Button>
            )}
        </>
    )
}

export default ButtonAddUpgrade