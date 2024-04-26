import React, { useEffect, useState } from "react";
import { Button, Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, TextField } from '@mui/material';
import ExclusiveSelection from './ExclusiveSelection'
import PriceRangeSelector from "./PriceRangeSelector";
import SaveSearchModal from './SaveSearchModal';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getProtectedResource } from "../utils/api";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Margin } from "@mui/icons-material";
import logo from "../Assets/ASPC logo.png"

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
    Beds,
    Baths,
    priceRange,
    handleCategoryChange,
    typeCategory,
    handleTypeChange,
    locationCategory,
    handleLocationChange,
    handlePriceChange,
    FloorArea,
    handleAreaChange,
    handleExclusiveSelectionChange,
    handlebathChange,
    handleApplyFilter,
    handleSortChange,
    sortOption,
    Categorys,
    Types,
    locations,
    ITEM_HEIGHT,
    ITEM_PADDING_TOP,
    MenuProps,
    handleSaveSearch,
    items }) => {


    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const { loginWithRedirect } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);

    const loginclick = async (event) => {
        event.preventDefault();
        loginWithRedirect()
    }

    const toggleLogin = () => {
        setLoginOpen(prev => !prev)
        console.log("login is " + loginOpen)
    };
    const toggleSignup = () => {

        setSignupOpen(prev => !prev)
        console.log("signup is " + signupOpen)
    };

    return (
        <div className="filterPanel">
            <div className="row">
                <img className="ASPCimg" src={logo}></img>
                <h1 className="ASPCtext" >ASPC</h1>
                {/* <FormControl variant="outlined" className="formControl">
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
                </FormControl> */}


                {/* <FormControl variant="outlined" className="formControl">
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
                </FormControl> */}

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

                {/* <ExclusiveSelection label="Beds" onSelectionChange={handleExclusiveSelectionChange} />

                <ExclusiveSelection label="Bathrooms" onSelectionChange={handlebathChange} /> */}

                {/* <div className="buttonGroup">
                    <Button style={{ marginTop: "0px" }} onClick={handleApplyFilter} className="ApplyButton" variant="contained">Apply Filter</Button>
                    <Button style={{ marginTop: "0px", backgroundColor: "#bbdabb" }} onClick={() => setModalOpen(true)} className="SaveSearchButton" variant="contained">Save Search</Button>
                    <SaveSearchModal
                        handleSaveSearch={handleSaveSearch}
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)} />
                </div> */}
                <div className='SignupWrapper' onClick={loginclick}>

                    <AccountCircleIcon style={{ color: "#1976d2", fontSize: "2.15rem" }} /> {/* Icon component */}
                    <span className="myAccountText" >My Account</span> {/* Text next to icon */}
                </div>
            </div>

            <div><FormControl className="Sort-Dropdown" sx={{ m: 1, width: 300 }}>
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

                <div className="oftotal">{items} Results</div></div>




        </div>
    )



}


export default FilterPanel