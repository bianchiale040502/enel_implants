import React from 'react';
import { NavigationContext } from '../contextFiles/NavigationContext';

import {
    TableCell,
    TableRow,
    Stack,
    Box,
    Tooltip
} from '@mui/material';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningIcon from '@mui/icons-material/Warning';

import ButtonAddUpgrade from '../buttonAddUpgrade/ButtonAddUpgrade';
import ButtonDelete from '../buttonDelete/ButtonDelete';

const oneYearInMilliseconds = 365.25 * 24 * 60 * 60 * 1000;

function RowImplants({
    selectEnelImplant,
    enelImplants,
    enelImplant,
    openChange,
    setCurrentImpianto,
    isEditingChange,
}) {
    const formatRatedPower = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return value;

        const fixed = num.toFixed(10);
        const trimmed = fixed.replace(/0+$/, '');
        const parts = trimmed.split('.');

        if (parts.length === 1) return parts[0];

        const decimals = parts[1];

        if (/^0*$/.test(decimals.slice(3))) {
            return num.toFixed(3);
        }

        return trimmed;
    };

    const boxCell = {
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }

    const CustomTooltip = ({ title, children }) => (
        <Tooltip
            title={title}
            placement="top"
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: { offset: [0, -12] },
                        },
                    ],
                },
            }}
        >
            {children}
        </Tooltip>
    );

    const lastUpdateDate = new Date(enelImplant.dateLastUpdate);

    const day = lastUpdateDate.getDate();
    const month = lastUpdateDate.getMonth() + 1;
    const year = lastUpdateDate.getFullYear();

    const today = new Date().getTime();
    const updateRequired = (enelImplant.dateLastUpdate + oneYearInMilliseconds) <= today;

    const { token, isLoggedin } = React.useContext(NavigationContext);

    return (
        <TableRow key={enelImplant.id}>
            <TableCell>
                <Box style={boxCell}>
                    {updateRequired ? (
                        <CustomTooltip title="Non Aggiornato">
                            <WarningIcon color="error" sx={{ fontSize: 30 }} />
                        </CustomTooltip>
                    ) : (
                        <CustomTooltip title="Aggiornato">
                            <CheckCircleOutlineOutlined color="success" sx={{ fontSize: 40 }} />
                        </CustomTooltip>
                    )}
                </Box>
                <Box style={boxCell}
                    sx={{ mx: 0.5, paddingTop: 0.25 }}
                >
                    Aggiornato il: {day}/{month}/{year}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.implant_name}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.category}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.country}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.num_unita_presenti}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.num_unita_operativi}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {formatRatedPower(enelImplant.rated_power)}
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.operability ?
                        <CustomTooltip title="Operativo">
                            <CheckCircleOutlineOutlined color="success" sx={{ fontSize: 40 }} />
                        </CustomTooltip>
                        :
                        <CustomTooltip title="Non Operativo">
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        </CustomTooltip>
                    }
                </Box>
            </TableCell>
            <TableCell>
                <Box style={boxCell}>
                    {enelImplant.availability ?
                        <CustomTooltip title="Disponibile">
                            <CheckCircleOutlineOutlined color="success" sx={{ fontSize: 40 }} />
                        </CustomTooltip>
                        :
                        <CustomTooltip title="Non Disponibile">
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        </CustomTooltip>
                    }
                </Box>
            </TableCell>
            {isLoggedin && (
                <TableCell>
                    <Stack sx={{ gap: 0.5 }}>
                        <ButtonAddUpgrade
                            enelImplant={enelImplant}
                            openChange={openChange}
                            setCurrentImpianto={setCurrentImpianto}
                            isEditingChange={isEditingChange}
                        />
                        <ButtonDelete
                            selectEnelImplant={selectEnelImplant}
                            enelImplants={enelImplants}
                            enelImplant={enelImplant}
                        />
                    </Stack>
                </TableCell>
            )}
        </TableRow>
    );
}

export default RowImplants;