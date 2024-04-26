import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

const ExclusiveSelection = ({ label, onSelectionChange }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleSelection = (event, newSelection) => {
        if (newSelection === selectedValue) {
            setSelectedValue(null);
            setChecked(false);
            onSelectionChange(null);
        } else {
            setSelectedValue(newSelection);
            setChecked(true);
            onSelectionChange(newSelection);
        }
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Box sx={{ 
            display: 'flex',
             alignItems: 'center',
              marginLeft: 1.5,
               height:40,
               flexDirection:"column",
               alignItems:"flex-start",
               position:"relative",
               top:"-18px"
               }}>
            <Typography sx={{scale:"0.75",fontSize:"1rem"}} variant="subtitle2" component="div">
                {label}
            </Typography>
            <ToggleButtonGroup
                value={selectedValue}
                exclusive
                onChange={handleSelection}
                aria-label={label.toLowerCase()}
            >
                {[1, 2, 3, 4, 5].map((value) => (
                    <ToggleButton key={value} value={value} aria-label={`${value} ${label.toLowerCase()}`}>
                        {value}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            {selectedValue !== null && (
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                    label={`${selectedValue} or more`}
                    sx={{ marginLeft: 0, marginRight: 0, position:"relative", top:"-8px" }} // This moves the checkbox to the end of the container.
                />
            )}
        </Box>
    );
};

export default ExclusiveSelection;
