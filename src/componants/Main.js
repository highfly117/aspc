import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../CSS/Main.css"
import FilterPanel from "./FilterPanel";
import DataGridTable from "./DataGridTable";
import DetailsPanel from "./DetailsPanel";
import { usePropertyData } from '../hooks/usePropertyData';
import { useLocationData } from '../hooks/useLocationData';
import { useTypeData } from '../hooks/useTypeData';
import { useStatusData } from '../hooks/useStatusData';
import { useNew } from "../hooks/useNew";
import { useSaveSearch } from "../hooks/useSaveSearch"
import { event } from "jquery";
import { useAuth0 } from "@auth0/auth0-react";
import { FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';



const Main = () => {
    // const [data, setData] = useState([]);
    const [statusCategory, setStatusCategory] = useState([]);
    const [typeCategory, setTypeCategory] = useState([]);
    const [locationCategory, setLocationCategory] = useState([]);
    const [Types, setTypes] = useState([]);
    const [Categorys, SetCategory] = useState([]);
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [rowSelectionModel, setRowSelectionModel] = useState('');
    const [FloorArea, setFloorArea] = useState('')
    const [Beds, SetBeds] = useState('')
    const [Baths, Setbaths] = useState('')
    const [ignoreSelectionChange, setIgnoreSelectionChange] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const [SavefilterParams, setSaveFilterParams] = useState({});
    const [sortOption, setSortOption] = useState('Recent');
    const [selectedItem, setSelectedItem] = useState(null);



    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const menuProps = useMemo(() => ({
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    }), [ITEM_HEIGHT, ITEM_PADDING_TOP]);



    const columns = [
        {
            field: 'ImageLink', headerName: 'Image', width: 200, cellClassName: 'noLeftPadding', renderCell: (params) => (
                <div>
                    {params.row.StatusType !== "None" && (
                        <div style={{

                            position: "relative",
                            top: params.row.StatusType.includes("Under offer") ? "39px" : "50px",
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
                        zIndex: "0",
                        width: "225px",
                        position: "relative",
                        left: "0px"
                    }} />
                </div>
            )
        },
        { field: 'TimeStamp', headerName: 'Add on', width: 95, valueFormatter: ({ value }) => value.slice(0, 10) },
        { field: 'PriceType', headerName: 'Price Type', width: 115 },
        { field: 'PriceValue', headerName: 'Price Value', width: 115, valueFormatter: ({ value }) => value ? `£${value.toLocaleString()}` : "N/A" },
        { field: 'Address', headerName: 'Address', width: 325 },
        { field: 'Bedrooms', headerName: 'Bed', width: 50 },
        { field: 'Sittingrooms', headerName: 'Sit', width: 50 },
        { field: 'Bathrooms', headerName: 'Bath', width: 50 },
        { field: 'Space', headerName: 'Space', width: 70, valueFormatter: ({ value }) => value ? `${value}m2` : "N/A" },
        {
            field: 'pricePerSquareMeter',
            headerName: 'Price / m²',
            width: 85,
            valueGetter: (params) => {
                const price = params.row.PriceValue;
                const space = params.row.Space;
                if (price > 0 && space > 0) {
                    return price / space;
                }
                return null;
            },
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

    const propertyDataUrl = `${process.env.REACT_APP_API_URL_Properties}/datafilter`;

    const transformPropertyData = useCallback((data) => {
        return data.map(item => ({
            ...item,
            id: item._id,
            StatusType: item.Status.Type,
            PriceType: item.Price.Type,
            PriceValue: item.Price.Value,
            Address: `${item.Address.Address1}, ${item.Address.Address2}, ${item.Address.Postcode}`,
            postition: item.Address.position,
            Type: item.Type?.replace(/^feature-/, '') ?? '',
            ImageLink: item.ImageLink,
            URL: item.URL,
        }));
    }, []);





    const { data, MapLocations, count, loading, error } = usePropertyData(propertyDataUrl, transformPropertyData, filterParams, sortOption);
    const { locations, locationloading, locationerror } = useLocationData();
    const { types, typeloading, typeerror } = useTypeData();
    const { status, Statusloading, statuserror } = useStatusData();
    const { New, Newloading, Newerror } = useNew(transformPropertyData);
    const { SaveSearch, saveSearcherror } = useSaveSearch(SavefilterParams);





    const updateMapLocations = useCallback((selectedItem) => {
        setSelectedItem(selectedItem);
        console.log(selectedItem)
    }, []);

    const locationsForDetailsPanel = useMemo(() => {
        // If an item is selected, create an array with just that item's location
        if (selectedItem) {
            return [selectedItem];
        }
        // Otherwise, use MapLocations
        return MapLocations;
    }, [selectedItem, MapLocations]);

    const handleCategoryChange = (event) => { setStatusCategory(event.target.value); };
    const handleAreaChange = (event) => { setFloorArea(event.target.value); };
    const handleTypeChange = (event) => { setTypeCategory(event.target.value); };
    const handleSortChange = (event) => { setSortOption(event.target.value); };
    const handleBedChange = (event) => { SetBeds(event) }
    const handlebathChange = (event) => { Setbaths(event) }

    const handleLocationChange = (event) => {
        const newValue = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
        if (JSON.stringify(newValue) !== JSON.stringify(locationCategory)) {
            setLocationCategory(newValue);
        }
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setPriceRange({ minPrice, maxPrice });
        // Now, priceRange in Main has the updated values. You can use them as needed.
    };


    const handleSaveSearch = useCallback((searchName) => {
        const selectedLocationLabels = locationCategory.map(value => {
            const location = locations.find(loc => loc.value === value);
            return location ? `locations=${encodeURIComponent(location.label)}` : '';
        }).join('&');

        const selectedShowParams = statusCategory.map(value => {
            const category = status.find(cat => cat.value === value);
            return category ? `show=${encodeURIComponent(category.label)}` : '';
        }).join('&');

        const selectedTypeParams = typeCategory.map(value => {
            const type = types.find(ty => ty.value === value);
            return type ? `type=${encodeURIComponent(type.label)}` : '';
        }).join('&');


        const priceRangeParams = `minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;
        const minAreaParams = `minArea=${FloorArea}`
        const bedsParams = `beds=${Beds}`
        const bathParams = `baths=${Baths}`
        const SaveName = `Name=${searchName}`
        const queryParams = `${selectedLocationLabels}&${selectedShowParams}&${selectedTypeParams}&${priceRangeParams}&${minAreaParams}&${bedsParams}&${bathParams}&${SaveName}`;

        setSaveFilterParams(queryParams); // Update filter parameters state



    }, [locationCategory, statusCategory, typeCategory, priceRange.minPrice, priceRange.maxPrice, FloorArea, locations, Categorys, Baths, Beds, Types])

    const handleApplyFilter = useCallback(() => {
        const selectedLocationLabels = locationCategory.map(value => {
            const location = locations.find(loc => loc.value === value);
            return location ? `locations=${encodeURIComponent(location.label)}` : '';
        }).join('&');

        const selectedShowParams = statusCategory.map(value => {
            const category = status.find(cat => cat.value === value);
            return category ? `show=${encodeURIComponent(category.label)}` : '';
        }).join('&');

        const selectedTypeParams = typeCategory.map(value => {
            const type = types.find(ty => ty.value === value);
            return type ? `type=${encodeURIComponent(type.label)}` : '';
        }).join('&');


        const priceRangeParams = `minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;
        const minAreaParams = `minArea=${FloorArea}`
        const bedsParams = `beds=${Beds}`
        const bathParams = `baths=${Baths}`
        const queryParams = `${selectedLocationLabels}&${selectedShowParams}&${selectedTypeParams}&${priceRangeParams}&${minAreaParams}&${bedsParams}&${bathParams}`;

        setFilterParams(queryParams); // Update filter parameters state
        setIgnoreSelectionChange(true);

    }, [locationCategory, statusCategory, typeCategory, priceRange.minPrice, priceRange.maxPrice, FloorArea, locations, Categorys, Baths, Beds, Types])


    const handlesearchchange = (search) => {
        console.log(search);

        // Handling locations
        const locations = search.searchParams.locations || [];
        const newValue = Array.isArray(locations) ? locations : locations.split(',');
        setLocationCategory(newValue);

        // Handling minPrice and maxPrice
        const minPrice = search.searchParams.minPrice ? search.searchParams.minPrice.toString() : '';
        const maxPrice = search.searchParams.maxPrice ? search.searchParams.maxPrice.toString() : '';
        setPriceRange({ minPrice, maxPrice });

        // Handling show, type, beds, and baths
        setStatusCategory(search.searchParams.show || []);
        setTypeCategory(search.searchParams.type || []);
        setFloorArea(search.searchParams.minArea || '');
        SetBeds(search.searchParams.beds ? search.searchParams.beds.toString() : '');
        Setbaths(search.searchParams.baths ? search.searchParams.baths.toString() : '');

        // Log to see what's being set
        console.log(locationCategory, priceRange, statusCategory, FloorArea, typeCategory, Beds, Baths);

        // Call handleApplyFilter to apply the new filters

    };

    useEffect(() => {
        if (locationCategory.length > 0 || priceRange.minPrice || priceRange.maxPrice) {
            handleApplyFilter();
        }
    }, [locationCategory, priceRange, statusCategory, FloorArea, typeCategory, Beds, Baths]);

    useEffect(() => { const propertyDataUrl = `${process.env.REACT_APP_API_URL_Properties}/datafilter` }, [filterParams]); // React to changes in filterParams

    return (

        <div className="Main">
            <div className="MainPanel">
                <div className="inputPanel">

                    <FilterPanel
                        statusCategory={statusCategory}
                        typeCategory={typeCategory}
                        locationCategory={locationCategory}
                        priceRange={priceRange}
                        FloorArea={FloorArea}
                        Beds={Beds}
                        Baths={Baths}
                        sortOption={sortOption}
                        handleSaveSearch={handleSaveSearch}
                        handleCategoryChange={handleCategoryChange}
                        handleTypeChange={handleTypeChange}
                        handleLocationChange={handleLocationChange}
                        handlePriceChange={handlePriceChange}
                        handleAreaChange={handleAreaChange}
                        handleExclusiveSelectionChange={handleBedChange}
                        handlebathChange={handlebathChange}
                        handleApplyFilter={handleApplyFilter}
                        handleSortChange={handleSortChange}

                        Categorys={status}
                        Types={types}
                        locations={locations}
                        ITEM_HEIGHT={ITEM_HEIGHT}
                        ITEM_PADDING_TOP={ITEM_PADDING_TOP}
                        MenuProps={menuProps}
                        items={count}
                    ></FilterPanel>

                    <div className="SidePanel">
                        <FormControl className="Sort-Dropdown" sx={{ m: 1, width: 300 }}>
                            <InputLabel shrink={true} id="sort-label">Sort By</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort"
                                value={sortOption}
                                
                                input={<OutlinedInput label="Sort By" />}
                                MenuProps={menuProps}
                                displayEmpty
                            >
                                
                                
                            </Select>
                        </FormControl>

                        <div className="oftotal"> Results</div>

                    </div>

                    <DataGridTable
                        data={data}
                        columns={columns}
                        onSelectItem={updateMapLocations}
                        setRowSelectionModel={setRowSelectionModel}
                        ignoreSelectionChange={ignoreSelectionChange}
                        setMapLocations={MapLocations}

                    ></DataGridTable>

                    <DetailsPanel
                        data={data}
                        MapLocations={data}
                        NewProperties={New}
                        transformPropertyData={transformPropertyData}
                        handlesearchchange={handlesearchchange}
                    ></DetailsPanel>

                </div>
            </div>
        </div>
    )

}

export default Main