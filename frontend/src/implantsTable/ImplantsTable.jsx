import React, { useState } from 'react';
import { NavigationContext } from '../contextFiles/NavigationContext';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Paper
} from '@mui/material';
import RowImplants from '../rowImplants/RowImplants';
import DialogAddUpdate from '../dialogAddUpdate/dialogAddUpdate';
import ButtonAddUpgrade from '../buttonAddUpgrade/ButtonAddUpgrade';


function ImplantTable({
    enelImplants,
    selectEnelImplant,
    filterText,
    selectCategory,
    selectCountry,
    operabilityOnly,
    availabilityOnly,
}) {

    const boxCell = {
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }

    const [open, setOpen] = useState(false);
    const [currentImpianto, setCurrentImpianto] = useState({
        implant_name: "",
        category: "",
        country: "",
        rated_power: 0,
        num_unita_presenti: 1,
        num_unita_operativi: 0,
        operability: true,
        availability: true
    });
    const [isEditing, setIsEditing] = useState(false);

    const { isLoggedin } = React.useContext(NavigationContext);

    const rowsImplants = [];

    enelImplants.forEach((enelImplant) => {
        if (
            enelImplant.implant_name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (selectCategory.length && !selectCategory.includes(enelImplant.category)) {
            return;
        }
        if (selectCountry.length && !selectCountry.includes(enelImplant.country)) {
            return;
        }
        if (availabilityOnly && !enelImplant.availability) {
            return;
        }
        if (operabilityOnly && !enelImplant.operability) {
            return;
        }
        rowsImplants.push(
            <RowImplants
                selectEnelImplant={selectEnelImplant}
                enelImplants={enelImplants}
                enelImplant={enelImplant}
                openChange={setOpen}
                setCurrentImpianto={setCurrentImpianto}
                isEditingChange={setIsEditing}
                key={enelImplant.id}
            />
        )
    });

    return (
        <>
            {isLoggedin && (
                <ButtonAddUpgrade
                    openChange={setOpen}
                    setCurrentImpianto={setCurrentImpianto}
                    isEditingChange={setIsEditing}
                />
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Stato aggiornamento
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Nome
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Tipo di impianto
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Paese
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Potenza nominale in MW
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Num. Unità
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Num. Unità operative
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Operabilità
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box style={boxCell}>
                                    Disponibilità
                                </Box>
                            </TableCell>
                            {isLoggedin && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    <Box style={boxCell}>
                                        Azioni
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsImplants.length > 0 ? (
                            rowsImplants
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    align="center"
                                >
                                    Nessun impianto trovato
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogAddUpdate
                enelImplants={enelImplants}
                selectEnelImplant={selectEnelImplant}
                open={open}
                openChange={setOpen}
                currentImpianto={currentImpianto}
                setCurrentImpianto={setCurrentImpianto}
                isEditing={isEditing}
            />
        </>
    );
};

export default ImplantTable;