import { Button } from '@mui/material';

function ButtonAddUpgrade({
    // selectEnelImplant,
    // enelImplants,
    enelImplant,
    openChange,
    currentImpiantoChange,
    isEditingChange
}) {
    function handleOpen(enelImplant) {
        if (enelImplant) {
            currentImpiantoChange(enelImplant);
            isEditingChange(true);
        } else {
            currentImpiantoChange({
                name: "",
                category: "",
                country: "",
                rated_power: 0,
                num_unita_presenti: 0,
                operability: false,
                availability: false
            });
            isEditingChange(false);
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
                    sx={{ mr: 1 }}
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