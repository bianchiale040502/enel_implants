import { Button } from '@mui/material';

function ButtonAddUpgrade({
    enelImplant,
    openChange,
    currentImpiantoChange,
    isEditingChange
}) {
    function handleOpen(enelImplant) {
        if (enelImplant) {
            isEditingChange(true);
            currentImpiantoChange(enelImplant);
        } else {
            isEditingChange(false);
            currentImpiantoChange({
                implant_name: "",
                category: "",
                country: "",
                rated_power: 0,
                num_unita_presenti: 0,
                num_unita_operativi: 0,
                operability: false,
                availability: false
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
                    onClick={() => handleOpen(enelImplant)}
                    fullWidth
                >
                    Modifica
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
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