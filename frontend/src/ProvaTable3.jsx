import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProvaTable = () => {
    const [rows, setRows] = useState([
        { id: 1, name: "Mario", age: 25 },
        { id: 2, name: "Luigi", age: 30 },
        { id: 3, name: "Peach", age: 28 },
    ]);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Nome", width: 150, editable: true },
        { field: "age", headerName: "Età", width: 100, editable: true },
        {
            field: "actions",
            type: 'actions',
            headerName: "Azioni",
            renderCell: (params) => (
                <IconButton color="secondary" onClick={() => handleDeleteRow(params.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    const handleEditCellChange = (params) => {
        // Check if the id and field are defined
        if (params.id !== undefined && params.field !== undefined) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === params.id ? { ...row, [params.field]: params.value } : row
                )
            );
        } else {
            console.error("Invalid params in handleEditCellChange:", params);
        }
    };

    const handleDeleteRow = (id) => {
        // Ensure id is defined before attempting to delete
        if (id !== undefined) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } else {
            console.error("Invalid id in handleDeleteRow:", id);
        }
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                onCellEditCommit={handleEditCellChange}
                components={{
                    NoRowsOverlay: () => (
                        <Typography variant="h6" color="textSecondary" align="center">
                            Nessun record disponibile.
                        </Typography>
                    ),
                }}
            />
        </div>
    );
};

export default ProvaTable;

// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { IconButton, Typography } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ProvaTable = () => {
//     const [rows, setRows] = useState([
//         // { id: 1, name: "Mario", age: 25 },
//         // { id: 2, name: "Luigi", age: 30 },
//         // { id: 3, name: "Peach", age: 28 },
//     ]);

//     const columns = [
//         { field: "id", headerName: "ID", width: 90 },
//         { field: "name", headerName: "Nome", width: 150, editable: true },
//         { field: "age", headerName: "Età", width: 100, editable: true },
//         {
//             field: "actions",
//             type: 'actions',
//             headerName: "Azioni",
//             // cellClassName: 'actions',
//             renderCell: (params) => (
//                 <IconButton color="secondary" onClick={() => handleDeleteRow(params.id)}>
//                     <DeleteIcon />
//                 </IconButton>
//             ),
//         },
//     ];

//     const handleEditCellChange = (params) => {
//         setRows((prevRows) =>
//             prevRows.map((row) =>
//                 row.id === params.id ? { ...row, [params.field]: params.value } : row
//             )
//         );
//     };

//     const handleDeleteRow = (id) => {
//         setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//     };

//     return (
//         <div style={{ height: 400, width: "100%" }}>
//             {rows.length > 0 ? (
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                     disableSelectionOnClick
//                     onCellEditCommit={handleEditCellChange}
//                 />
//             ) : (
//                 <Typography variant="h6" color="textSecondary" align="center">
//                     Nessun record disponibile.
//                 </Typography>
//             )}
//         </div>
//     );
// };

// export default ProvaTable;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import {
//     GridRowModes,
//     DataGrid,
//     GridToolbarContainer,
//     GridActionsCellItem,
//     GridRowEditStopReasons,
// } from '@mui/x-data-grid';
// import {
//     randomCreatedDate,
//     randomTraderName,
//     randomId,
//     randomArrayItem,
// } from '@mui/x-data-grid-generator';

// const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//     return randomArrayItem(roles);
// };

// const initialRows = [
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         age: 25,
//         joinDate: randomCreatedDate(),
//         role: randomRole(),
//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         age: 36,
//         joinDate: randomCreatedDate(),
//         role: randomRole(),
//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         age: 19,
//         joinDate: randomCreatedDate(),
//         role: randomRole(),
//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         age: 28,
//         joinDate: randomCreatedDate(),
//         role: randomRole(),
//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         age: 23,
//         joinDate: randomCreatedDate(),
//         role: randomRole(),
//     },
// ];

// function EditToolbar(props) {
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//         const id = randomId();
//         setRows((oldRows) => [
//             ...oldRows,
//             { id, name: '', age: '', role: '', isNew: true },
//         ]);
//         setRowModesModel((oldModel) => ({
//             ...oldModel,
//             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//         }));
//     };

//     return (
//         <GridToolbarContainer>
//             <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//                 Add record
//             </Button>
//         </GridToolbarContainer>
//     );
// }

// export default function EditableDataGrid() {
//     const [rows, setRows] = React.useState(initialRows);
//     const [rowModesModel, setRowModesModel] = React.useState({});

//     const handleRowEditStop = (params, event) => {
//         if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//             event.defaultMuiPrevented = true;
//         }
//     };

//     const handleEditClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//     };

//     const handleSaveClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//     };

//     const handleDeleteClick = (id) => () => {
//         setRows(rows.filter((row) => row.id !== id));
//     };

//     const handleCancelClick = (id) => () => {
//         setRowModesModel({
//             ...rowModesModel,
//             [id]: { mode: GridRowModes.View, ignoreModifications: true },
//         });

//         const editedRow = rows.find((row) => row.id === id);
//         if (editedRow.isNew) {
//             setRows(rows.filter((row) => row.id !== id));
//         }
//     };

//     const processRowUpdate = (newRow) => {
//         const updatedRow = { ...newRow, isNew: false };
//         setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//         return updatedRow;
//     };

//     const handleRowModesModelChange = (newRowModesModel) => {
//         setRowModesModel(newRowModesModel);
//     };

//     const columns = [
//         { field: 'name', headerName: 'Name', width: 180, editable: true },
//         {
//             field: 'age',
//             headerName: 'Age',
//             type: 'number',
//             width: 80,
//             align: 'left',
//             headerAlign: 'left',
//             editable: true,
//         },
//         {
//             field: 'joinDate',
//             headerName: 'Join date',
//             type: 'date',
//             width: 180,
//             editable: true,
//         },
//         {
//             field: 'role',
//             headerName: 'Department',
//             width: 220,
//             editable: true,
//             type: 'singleSelect',
//             valueOptions: ['Market', 'Finance', 'Development'],
//         },
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Actions',
//             width: 100,
//             cellClassName: 'actions',
//             getActions: ({ id }) => {
//                 const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//                 if (isInEditMode) {
//                     return [
//                         <GridActionsCellItem
//                             icon={<SaveIcon />}
//                             label="Save"
//                             sx={{
//                                 color: 'primary.main',
//                             }}
//                             onClick={handleSaveClick(id)}
//                         />,
//                         <GridActionsCellItem
//                             icon={<CancelIcon />}
//                             label="Cancel"
//                             className="textPrimary"
//                             onClick={handleCancelClick(id)}
//                             color="inherit"
//                         />,
//                     ];
//                 }

//                 return [
//                     <GridActionsCellItem
//                         icon={<EditIcon />}
//                         label="Edit"
//                         className="textPrimary"
//                         onClick={handleEditClick(id)}
//                         color="inherit"
//                     />,
//                     <GridActionsCellItem
//                         icon={<DeleteIcon />}
//                         label="Delete"
//                         onClick={handleDeleteClick(id)}
//                         color="inherit"
//                     />,
//                 ];
//             },
//         },
//     ];

//     return (
//         <Box
//             sx={{
//                 height: 500,
//                 width: '100%',
//                 '& .actions': {
//                     color: 'text.secondary',
//                 },
//                 '& .textPrimary': {
//                     color: 'text.primary',
//                 },
//             }}
//         >
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 editMode="row"
//                 rowModesModel={rowModesModel}
//                 onRowModesModelChange={handleRowModesModelChange}
//                 onRowEditStop={handleRowEditStop}
//                 processRowUpdate={processRowUpdate}
//                 slots={{
//                     toolbar: EditToolbar,
//                 }}
//                 slotProps={{
//                     toolbar: { setRows, setRowModesModel },
//                 }}
//             />
//         </Box>
//     );
// }