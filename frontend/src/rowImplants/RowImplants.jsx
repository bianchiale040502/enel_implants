import React from 'react';
import { NavigationContext } from '../NavigationContext';

import {
    TableCell,
    TableRow,
    Box
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

import ButtonAddUpgrade from '../buttonAddUpgrade/ButtonAddUpgrade';
import ButtonDelete from '../ButtonDelete/buttonDelete';

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

    const { isLoggedin } = React.useContext(NavigationContext);

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
                            <WarningIcon color="error" sx={{ fontSize: 30 }} />
                        ) : (
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                        )}
                    </Box>
                </TableCell>
                <TableCell>{enelImplant.name}</TableCell>
                <TableCell>{enelImplant.category}</TableCell>
                <TableCell>{enelImplant.country}</TableCell>
                <TableCell>{enelImplant.rated_power}</TableCell>
                <TableCell>{enelImplant.num_unita_presenti}</TableCell>
                <TableCell>{enelImplant.num_unita_operativi}</TableCell>
                <TableCell>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {enelImplant.operability ?
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                            :
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        }
                    </Box>
                </TableCell>
                <TableCell>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {enelImplant.availability ?
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                            :
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        }
                    </Box>
                </TableCell>
                {isLoggedin && (
                    <TableCell>
                        <ButtonAddUpgrade
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
                )}
            </TableRow>
        </>
    );
}

export default RowImplants;