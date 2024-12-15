import React from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    ListItemText,
    FormControlLabel,
    Box,
} from "@mui/material";

function SearchBar({
    filterText,
    category,
    country,
    selectCategory,
    selectCountry,
    operabilityOnly,
    availabilityOnly,
    onFilterTextChange,
    selectCategoryChange,
    selectCountryChange,
    operabilityOnlyChange,
    availabilityOnlyChange
}) {
    return (
        <Box display="flex" alignItems="center" gap={2}>

            <TextField
                name="searchImplant"
                variant="outlined"
                value={filterText}
                placeholder="Cerca impianto"
                onChange={(e) => onFilterTextChange(e.target.value)}
                sx={{ width: 0.20 }}
            />

            <FormControl
                variant="outlined"
                sx={{ width: 0.20 }}
            >
                <InputLabel>Tipo di impianto</InputLabel>
                <Select
                    name="searchCategory"
                    multiple
                    value={Array.isArray(selectCategory) ? selectCategory : []}
                    onChange={(e) => selectCategoryChange(e.target.value) ? e.target.value : []}
                    label="Tipo di impianto"
                    renderValue={(selected) => { return Array.isArray(selected) && selected.join(", ") }}
                >
                    {category.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            <Checkbox checked={selectCategory.includes(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                sx={{ width: 0.20 }}
            >
                <InputLabel>Paese</InputLabel>
                <Select
                    name="searchCountry"
                    multiple
                    value={Array.isArray(selectCountry) ? selectCountry : []}
                    onChange={(e) => selectCountryChange(e.target.value) ? e.target.value : []}
                    label="Paese"
                    renderValue={(selected) => { return Array.isArray(selected) && selected.join(", ") }}
                >
                    {country.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            <Checkbox checked={selectCountry.includes(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel
                control={
                    <Checkbox
                        name="searchAvailabilityTrue"
                        checked={operabilityOnly}
                        onChange={(e) => operabilityOnlyChange(e.target.checked)}
                    />
                }
                label="Impianti Operativi (in funzione)"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="searchOperabilityTrue"
                        checked={availabilityOnly}
                        onChange={(e) => availabilityOnlyChange(e.target.checked)}
                    />
                }
                label="Impianti Disponibili"
            />
        </Box>
    );
}

export default SearchBar;