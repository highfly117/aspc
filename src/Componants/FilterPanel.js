import React from "react";
import { Button, Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, TextField } from '@mui/material';
import ExclusiveSelection from './ExclusiveSelection'
import PriceRangeSelector from "./PriceRangeSelector";


const sortOptions = [
    { label: 'Most Recent', key: 'Recent' },
    { label: 'Price Low to High', key: 'LowHigh' },
    { label: 'Price High to Low', key: 'HighLow' },
    { label: 'm² - ↓', key: 'AreaDesc' },
    { label: 'm² - ↑', key: 'AreaAsc' },
    { label: '£/m² - ↑', key: 'PricePerAreaAsc' },
    { label: '£/m² - ↓', key: 'PricePerAreaDesc' }
];

const FilterPanel = ({
    statusCategory,
    handleCategoryChange,
    typeCategory,
    handleTypeChange,
    locationCategory,
    handleLocationChange,
    handlePriceChange,
    FloorArea,
    handleAreaChange,
    handleExclusiveSelectionChange,
    handleApplyFilter,
    handleSortChange,
    sortOption,
    Categorys,
    Types,
    locations,
    ITEM_HEIGHT,
    ITEM_PADDING_TOP,
    MenuProps }) => {

    const [sortValue, setSortValue] = React.useState([]);





    return (

        <div className="filterPanel">
            <div className="row" style={{ justifyContent: "space-around" }}>
                <FormControl variant="outlined" className="formControl">
                    <InputLabel id="show-multiple-chip-label-show" shrink={true}>Show</InputLabel>
                    <Select
                        labelId="show-multiple-chip-label"
                        id="show-multiple-chip"
                        multiple
                        value={statusCategory} // This should be an array to support multiple selections
                        onChange={handleCategoryChange} // Update to handle multiple selections
                        input={<OutlinedInput label="Show" />} // Ensure the label is passed here for proper alignment
                        displayEmpty
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={Categorys.find(Category => Category.value === value)?.label} /> // You need a function to map type values to labels
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {Categorys.map((Category) => (
                            <MenuItem key={Category.value} value={Category.value}>
                                {Category.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className="formControl">
                    <InputLabel id="type-multiple-chip-label-Type" shrink={true}>Type</InputLabel>
                    <Select
                        labelId="type-multiple-chip-label"
                        id="type-multiple-chip"
                        multiple
                        value={typeCategory} // This should be an array to support multiple selections
                        onChange={handleTypeChange} // Update to handle multiple selections
                        input={<OutlinedInput label="Type" />} // Ensure the label is passed here for proper alignment
                        displayEmpty
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={Types.find(Type => Type.value === value)?.label} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {Types.map((Type) => (
                            <MenuItem key={Type.value} value={Type.value}>
                                {Type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className="formControl2">
                    <InputLabel id="location-multiple-chip-label-location" shrink={true}>Location</InputLabel>
                    <Select
                        labelId="location-multiple-chip-label"
                        id="location-multiple-chip"
                        multiple
                        value={locationCategory}
                        onChange={handleLocationChange}
                        input={<OutlinedInput label="Location" />} // Ensure the label is passed here for proper alignment

                        displayEmpty
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={locations.find(location => location.value === value)?.label} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {locations.map((location) => (
                            <MenuItem key={location.value} value={location.value}>
                                {location.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <PriceRangeSelector onPriceChange={handlePriceChange}></PriceRangeSelector>

                <FormControl variant="outlined" className="formControl3">
                    <TextField
                        label="Floor Area (min)" // Specify the label here
                        variant="outlined"
                        fullWidth
                        value={FloorArea}
                        onChange={handleAreaChange}
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 0, // Optional: minimum value constraint
                            }
                        }}
                        className="FloorArea-range-text-field"
                        InputLabelProps={{
                            shrink: true, // This will make the label always shrunk
                        }}
                    />
                </FormControl>

                <ExclusiveSelection label="Beds" onSelectionChange={handleExclusiveSelectionChange} />

                <ExclusiveSelection label="Bathrooms" onSelectionChange={handleExclusiveSelectionChange} />

                <Button style={{ marginTop: "12px" }} onClick={handleApplyFilter} className="ApplyButton" variant="contained">Apply Filter</Button>
            </div>
            {/* <div className="row" style={{justifyContent:"flex-end", marginRight:"20px", marginTop:"10px"}}>



                           
                        </div> */}

            <FormControl className="Sort-Dropdown" sx={{ m: 1, width: 300 }}>
                <InputLabel shrink={true} id="sort-label">Sort By</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    input={<OutlinedInput label="Sort By" />}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.key} value={option.key}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )



}


export default FilterPanel