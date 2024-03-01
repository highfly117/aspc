import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./CSS/Main.css"
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, TextField } from '@mui/material';
import ExclusiveSelection from './ExclusiveSelection'
import WeatherMap from "./Mapbox";
import PriceRangeSelector from "./PriceRangeSelector";




const Main = () => {
    const [data, setData] = useState([]);
    const [statusCategory, setStatusCategory] = useState([]);
    const [typeCategory, setTypeCategory] = useState([]);
    const [locationCategory, setLocationCategory] = useState([]);
    const [locations, setLocations] = useState([]);
    const [Types, setTypes] = useState([]);
    const [Categorys, SetCategory] = useState([]);
    const [MapLocations, setMapLocations] = useState([])
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [rowSelectionModel, setRowSelectionModel] = useState('');
    const [FloorArea, setFloorArea] = useState('')
    const [ignoreSelectionChange, setIgnoreSelectionChange] = useState(false);


    const columns = [
        {
            field: 'ImageLink', headerName: 'Image', width: 200, cellClassName: 'noLeftPadding', renderCell: (params) => (
                <div>
                    {params.row.StatusType !== "None" && (
                        <div style={{
                            
                            position: "relative",
                            top: params.row.StatusType.includes("Under offer") ? "39px":"50px",
                            left: params.row.StatusType.includes("Under offer") ? "-62px" : "-19px",
                            background: params.row.StatusType.includes("Closing") ? "rgb(204, 61, 128)" : "rgb(128, 204, 61)",
                            fontWeight: "700",
                            color: "white",
                            fontSize: "16px",
                            textWrap: "initial"
                        }}>
                            {params.row.StatusType}
                        </div>)}
                    <img src={params.value} alt="Property" style={{
                        zIndex:"0",
                        width: "225px",
                        position: "relative",
                        left: "0px"
                        }}/>
                </div>
            )
        },
        { field: 'Addon', headerName: 'Add on', width: 115 },
        { field: 'PriceType', headerName: 'Price Type', width: 115 },
        { field: 'PriceValue', headerName: 'Price Value', width: 115, valueFormatter: ({ value }) => value ? `£${value.toLocaleString()}` : "N/A" },
        { field: 'Address', headerName: 'Address', width: 375 },
        { field: 'Bedrooms', headerName: 'Bed', width: 50 },
        { field: 'Sittingrooms', headerName: 'Sit', width: 50 },
        { field: 'Bathrooms', headerName: 'Bath', width: 50 },
        { field: 'Space', headerName: 'Space', width: 70, valueFormatter: ({ value }) => value ? `${value}m2` : "N/A" },
        {
            field: 'pricePerSquareMeter',
            headerName: 'Price / m²',
            width: 85,
            // Calculate and return a numeric value for sorting/filtering
            valueGetter: (params) => {
                const price = params.row.PriceValue;
                const space = params.row.Space;
                if (price > 0 && space > 0) {
                    return price / space; // Return the numeric value for sorting
                }
                return null; // Return null if calculation is not possible
            },
            // Format the numeric value for display
            valueFormatter: ({ value }) => {
                if (value !== null) {
                    return `£${value.toFixed(0)}`; // Format the value as currency
                }
                return "N/A"; // Display "N/A" for null values
            },
        },
        { field: 'Type', headerName: 'Type', width: 100 },
        { field: 'URL', headerName: 'URL', width: 50, renderCell: (params) => (<a href={params.value} target="_blank" rel="noopener noreferrer">View</a>) }
    ];



    useEffect(() => {

        const loadData = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL_Properties}/data`);
                // Transform data here to match DataGrid expectations

                const transformedData = response.data.map(item => ({
                    ...item,
                    Addedon:item.TimeStamp,
                    id: item._id, // Ensuring each row has an 'id' property
                    StatusType: item.Status.Type,
                    PriceType: item.Price.Type,
                    PriceValue: item.Price.Value,
                    Address: `${item.Address.Address1}, ${item.Address.Address2}, ${item.Address.Postcode}`,
                    postition: item.Address.position,
                    Type: item.Type?.replace(/^feature-/, '') ?? '',
                    ImageLink: item.ImageLink, // Assuming you want to show images
                    URL: item.URL, // Assuming you want to make URLs clickable
                }));
                setData(transformedData);
                setMapLocations(transformedData.slice(0, 200))
                console.log(data)
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Step 2: Fetch location data from your API
                const response = await axios.get(`${process.env.REACT_APP_API_URL_Properties}/postcodes`);
                let areaCounter = 1; // Initialize a counter to ensure unique keys

                // Generate locations with a global counter to ensure unique values
                const fetchedLocations = response.data.flatMap(doc =>
                    Object.values(doc.Areas).map(areaName => ({
                        value: `Area${areaCounter++}`, // Increment counter for each area
                        label: areaName
                    }))
                );
                fetchedLocations.sort((a, b) => a.label.localeCompare(b.label));


                setLocations(fetchedLocations);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL_Properties}/types`);
                // Map the fetched types array to an array of objects with value and label properties
                const fetchedTypes = response.data.map(type => ({
                    value: type, // Use the type string as the value
                    label: type  // Use the type string as the label
                }));


                setTypes(fetchedTypes); // Assuming you have a setTypes function to update your state
            } catch (error) {
                console.error('Failed to fetch Types:', error);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL_Properties}/status`);



                const fetchedStatus = response.data.map(status => ({
                    value: status, // Use the type string as the value
                    label: status  // Use the type string as the label
                }));


                SetCategory(fetchedStatus); // Assuming you have a setTypes function to update your state
            } catch (error) {
                console.error('Failed to fetch Status:', error);
            }
        };

        fetchStatus();
    }, []);

    const handleCategoryChange = (event) => {
        setStatusCategory(event.target.value);
    };

    const handleAreaChange = (event) => {
        setFloorArea(event.target.value);
    };

    const handleTypeChange = (event) => {
        setTypeCategory(event.target.value);
    };

    const handleExclusiveSelectionChange = (selectedValue) => {
        console.log("Selected value:", selectedValue);
        // Additional logic based on selection
    }

    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocationCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setPriceRange({ minPrice, maxPrice });
        // Now, priceRange in Main has the updated values. You can use them as needed.
    };



    const handleApplyFilter = async () => {
        try {
            setIgnoreSelectionChange(true);
            // Map selected values to their corresponding labels
            const selectedLocationLabels = locationCategory.map(value => {
                const location = locations.find(loc => loc.value === value);
                return location ? `locations=${encodeURIComponent(location.label)}` : '';
            }).join('&');

            const selectedShowParams = statusCategory.map(value => {
                const category = Categorys.find(cat => cat.value === value);
                return category ? `show=${encodeURIComponent(category.label)}` : '';
            }).join('&');

            const selectedTypeParams = typeCategory.map(value => {
                const type = Types.find(ty => ty.value === value);
                return type ? `type=${encodeURIComponent(type.label)}` : '';
            }).join('&');


            const priceRangeParams = `minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;

            const minAreaParams = `minArea=${FloorArea}`

            // Construct a query string from selected labels
            const queryParams = `${selectedLocationLabels}&${selectedShowParams}&${selectedTypeParams}&${priceRangeParams}&${minAreaParams}`;


            // Make a GET request with the selected location values
            const response = await axios.get(`${process.env.REACT_APP_API_URL_Properties}/datafilter?${queryParams}`);

            // Update your data state with the response data
            const transformedData = response.data.map(item => ({
                ...item,
                id: item._id, // Ensuring each row has an 'id' property
                StatusType: item.Status.Type,
                PriceType: item.Price.Type,
                PriceValue: item.Price.Value,
                Address: `${item.Address.Address1}, ${item.Address.Address2}, ${item.Address.Postcode}`,
                postition: item.Address.position,
                ImageLink: item.ImageLink, // Assuming you want to show images
                URL: item.URL // Assuming you want to make URLs clickable
                // Other transformations as needed
            }));
            console.log(transformedData)


            setData(transformedData);
            setMapLocations(transformedData.slice(0, 200))

            setIgnoreSelectionChange(false);

        } catch (error) {
            console.error('Failed to fetch filtered data:', error);
        }
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    };

    return (

        <div className="Main">
            <div className="MainPanel">

                <div className="inputPanel">
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
                    </div>

                    <DataGrid className="dataTable"
                        getRowClassName={(params) => {
                            if (params.row.StatusType.startsWith('Under offer')) {
                                return 'rowUnderOffer';
                            } else if (params.row.StatusType.startsWith('Closing')) {
                                return 'rowClosing';
                            } else if (params.row.StatusType.startsWith('Sold')) {
                                return 'rowSold';
                            }
                            return '';
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection={false}
                        rowHeight={100}
                        onRowSelectionModelChange={(newSelectionModel) => {
                            if (!ignoreSelectionChange) {
                                setRowSelectionModel(newSelectionModel);
                                const selectedData = data.filter(row => newSelectionModel.includes(row.id));
                                if (selectedData.length > 0) {
                                    setMapLocations(selectedData);
                                }
                                console.log(newSelectionModel);
                            }
                        }


                        }
                    />
                    <div className="detailsPanel">
                        <div className="Mapbox">
                            {data.length > 0 ? (
                                <WeatherMap locations={MapLocations} />
                            ) : (
                                <div>Loading map...</div>
                            )}
                        </div>
                    </div>

                </div>



            </div>
        </div>
    )

}

export default Main