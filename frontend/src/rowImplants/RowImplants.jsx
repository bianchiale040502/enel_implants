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
import ButtonDelete from '../buttonDelete/ButtonDelete';

const oneYearInMilliseconds = 365.25 * 24 * 60 * 60 * 1000;

function RowImplants({
    selectEnelImplant,
    enelImplants,
    enelImplant,
    openChange,
    currentImpiantoChange,
    isEditingChange
}) {

    const boxCell = {
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }

    const today = new Date().getTime();
    const updateRequired = (enelImplant.dateLastUpdate + oneYearInMilliseconds) <= today;

    const { token, isLoggedin } = React.useContext(NavigationContext);

    return (
        <>
            <TableRow key={enelImplant.id}>
                <TableCell>
                    <Box style={boxCell}>
                        {updateRequired ? (
                            <WarningIcon color="error" sx={{ fontSize: 30 }} />
                        ) : (
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                        )}
                    </Box>
                </TableCell>
                <TableCell>
                    <Box style={boxCell}>
                        {enelImplant.name}
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
                        {enelImplant.rated_power}
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
                        {enelImplant.operability ?
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                            :
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        }
                    </Box>
                </TableCell>
                <TableCell>
                    <Box style={boxCell}>
                        {enelImplant.availability ?
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                            :
                            <WarningIcon color="error" sx={{ fontSize: 40 }} />
                        }
                    </Box>
                </TableCell>
                {isLoggedin && (
                    <TableCell>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}>
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
                        </Box>
                    </TableCell>
                )}
            </TableRow>
        </>
    );
}

export default RowImplants;