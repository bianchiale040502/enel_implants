import React, { useState } from "react";
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
                variant="outlined"
                value={filterText}
                placeholder="Cerca impianto"
                onChange={(e) => onFilterTextChange(e.target.value)}
                fullWidth
            />

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Tipo di impianto</InputLabel>
                <Select
                    multiple
                    value={selectCategory}
                    onChange={(e) => selectCategoryChange(e.target.value)}
                    label="category"
                    renderValue={(selected) => selected.join(", ")}
                >
                    {category.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            <Checkbox checked={selectCategory.includes(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Paese</InputLabel>
                <Select
                    multiple
                    value={selectCountry}
                    onChange={(e) => selectCountryChange(e.target.value)}
                    label="country"
                    renderValue={(selected) => selected.join(", ")}
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
                        checked={availabilityOnly}
                        onChange={(e) => availabilityOnlyChange(e.target.checked)}
                    />
                }
                label="Impianti disponibili"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={operabilityOnly}
                        onChange={(e) => operabilityOnlyChange(e.target.checked)}
                    />
                }
                label="Implanti operativi"
            />
        </Box>
    );
}

export default SearchBar;