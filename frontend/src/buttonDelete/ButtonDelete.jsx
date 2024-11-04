import { Button } from '@mui/material';

function ButtonDelete({
    selectEnelImplant,
    enelImplants,
    enelImplant
}) {

    function handleDelete(id) {
        selectEnelImplant(enelImplants.filter(imp => imp.id !== id));
    };

    return (
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(enelImplant.id)}
        >
            Elimina
        </Button>
    )

}

export default ButtonDelete