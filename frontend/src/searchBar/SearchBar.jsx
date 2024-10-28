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
    enelImplants,
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
    const category = [...new Set(enelImplants.map(implant => implant.category))];
    const country = [...new Set(enelImplants.map(implant => implant.country))];

    return (
        <Box display="flex" alignItems="center" gap={2}>

            <TextField
                variant="outlined"
                value={filterText}
                placeholder="Implant"
                onChange={(e) => onFilterTextChange(e.target.value)}
                fullWidth
            />

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Type of Plant</InputLabel>
                <Select
                    multiple
                    value={selectCategory}
                    onChange={(e) => selectCategoryChange(e.target.value)}
                    label="Type of Plant"
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
                <InputLabel>Country</InputLabel>
                <Select
                    multiple
                    value={selectCountry}
                    onChange={(e) => selectCountryChange(e.target.value)}
                    label="Country"
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
                label="Available implants"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={operabilityOnly}
                        onChange={(e) => operabilityOnlyChange(e.target.checked)}
                    />
                }
                label="Operable implants"
            />
        </Box>
    );
}

export default SearchBar;