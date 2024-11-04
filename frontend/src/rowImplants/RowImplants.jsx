import ButtonAddUpgrade from '../buttonAddUpgrade/ButtonAddUpgrade';
import ButtonDelete from '../ButtonDelete/buttonDelete';
import {
    TableCell,
    TableRow,
    Box
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

const oneYearInMilliseconds = 365.25 * 24 * 60 * 60 * 1000;

function RowImplants({
    selectEnelImplant,
    enelImplants,
    enelImplant,
    openChange,
    currentImpiantoChange,
    isEditingChange
}) {

    const today = new Date().getTime();
    const updateRequired = (enelImplant.dateLastUpdate + oneYearInMilliseconds) <= today;

    return (
        <>
            <TableRow key={enelImplant.id}>
                <TableCell>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {updateRequired ? (
                            <WarningIcon color="error" />
                        ) : (
                            <CheckCircleOutlineIcon color="success" />
                        )}
                    </Box>
                </TableCell>
                <TableCell>{enelImplant.name}</TableCell>
                <TableCell>{enelImplant.category}</TableCell>
                <TableCell>{enelImplant.country}</TableCell>
                <TableCell>{enelImplant.rated_power} MW</TableCell>
                <TableCell>{enelImplant.num_unita_presenti}</TableCell>
                <TableCell>{enelImplant.operability ? 'Sì' : 'No'}</TableCell>
                <TableCell>{enelImplant.availability ? 'Sì' : 'No'}</TableCell>
                <TableCell>
                    <ButtonAddUpgrade
                        // selectEnelImplant={selectEnelImplant}
                        // enelImplants={enelImplants}
                        enelImplant={enelImplant}
                        openChange={openChange}
                        currentImpiantoChange={currentImpiantoChange}
                        isEditingChange={isEditingChange}
                    />
                    <ButtonDelete
                        selectEnelImplant={selectEnelImplant}
                        enelImplants={enelImplants}
                        enelImplant={enelImplant}
                    />
                </TableCell>
            </TableRow>
        </>
    );
}

export default RowImplants;