import React, { useState } from 'react';
import { NavigationContext } from '../NavigationContext';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
    availabilityOnly
}) {

    const [open, setOpen] = useState(false);
    const [currentImpianto, setCurrentImpianto] = useState({
        name: "",
        category: "",
        country: "",
        rated_power: 0,
        num_unita_presenti: 0,
        operability: false,
        availability: false
    });
    const [isEditing, setIsEditing] = useState(false);

    const { isLoggedin } = React.useContext(NavigationContext);

    const rowsImplants = [];

    enelImplants.forEach((enelImplant) => {
        if (
            enelImplant.name.toLowerCase().indexOf(
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
                currentImpiantoChange={setCurrentImpianto}
                isEditingChange={setIsEditing}
                key={enelImplant.id}
            />
        )
    });

    return (
        <>
            {isLoggedin && (
                <ButtonAddUpgrade
                    // selectEnelImplant={selectEnelImplant}
                    // enelImplants={enelImplants}
                    // enelImplant={enelImplant}
                    openChange={setOpen}
                    currentImpiantoChange={setCurrentImpianto}
                    isEditingChange={setIsEditing}
                />
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Stato aggiornamento
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Nome
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Tipo di impianto
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Paese
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Potenza nominale in MW
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Num. Unità
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Num. Unità operative
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Operabilità
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Disponibilità
                            </TableCell>
                            {isLoggedin && (
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    Azioni
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
                                    sx={{ fontWeight: 'bold' }}
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
                currentImpiantoChange={setCurrentImpianto}
                isEditing={isEditing}
            />
        </>
    );
};

export default ImplantTable;