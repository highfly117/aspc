/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState, useCallback } from "react";
import {Button} from "@mui/material"
import GoogleMapProperties from "./GoogleMap";
import MemoizedWeatherMap from "./Mapbox";
import Propertybanner_sm from "./Propertybanner_sm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth0 } from "@auth0/auth0-react";
import { getProtectedResource2 } from "../utils/api";
import "../CSS/DetailsPanel.css"
import { usePropertyData } from "../hooks/usePropertyData";

const TabPanel = ({ value, index, children }) => {
    return value === index && <div>{children}</div>;
};

const DetailsPanel = ({ data, MapLocations, NewProperties, transformPropertyData,handlesearchchange}) => {
    const [value, setValue] = useState(0);
    const [Favorites, setFavorites] = useState([]);
    const [savedSearches, setSavedSearches] = useState([]);
    const [filterParams, setFilterParams] = useState({})
    const [flag, setflag] = useState(0)
    
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const propertyDataUrl = `${process.env.REACT_APP_API_URL_Properties}/datafilter`;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getUserMetadata = async () => {
          
      
          try {
            const accessToken = await getAccessTokenSilently();
      
            const { data, error } = await getProtectedResource2(accessToken, user);

            const transformedData = transformPropertyData(data.properties)
            setSavedSearches(data.savedSearches)
            setFavorites(transformedData)
            
            console.log(data.savedSearches)
          } catch (error) {
            console.log(error.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

      const arrayToQueryString = (array, key) => {
        return array.map(item => `${key}=${encodeURIComponent(item)}`).join('&');
    };

    

    const searchhandler = useCallback((search) =>{
        console.log(search)

        

        const locationsQuery = arrayToQueryString(search.searchParams.locations, 'locations');
        const showQuery = arrayToQueryString(search.searchParams.show, 'show');
        const typeQuery = arrayToQueryString(search.searchParams.type, 'type');
        const priceRangeParams = `minPrice=${search.searchParams.minPrice}&maxPrice=${search.searchParams.maxPrice}`;
        const minAreaParams = `minArea=${search.searchParams.FloorArea}`
        const bedsParams = `beds=${search.searchParams.Beds}`
        const bathParams = `baths=${search.searchParams.Baths}`

        const queryParams = `${locationsQuery}&${showQuery}&${typeQuery}&${priceRangeParams}&${minAreaParams}&${bedsParams}&${bathParams}`;

        setFilterParams(queryParams)
        setflag(1)
    },[filterParams])

    return (
        <div className="detailsPanel">
            <div className="Mapbox">
                {data.length > 0 ? (
                    <GoogleMapProperties locations={MapLocations} />
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
            <div className="Tabbox">
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="icon label tabs example">
                    <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                    <Tab icon={<AutoAwesomeIcon />} label="NEW TODAY" />
                    <Tab icon={<SearchIcon />} label="SAVED SEARCHES" />
                </Tabs>
                <TabPanel value={value} index={1}>
                    {NewProperties.map((item, index) => (
                        <Propertybanner_sm
                            key={item._id}
                            Profile={user}
                            propertyId={item._id}
                            imageUrl1={item.ImageLink}
                            imageUrl2={item.PhotoURLs}
                            priceType={item.Price.Type}
                            price={`£${item.Price.Value}`}
                            size={`${item.Space}m2`}
                            Status={item.Status}
                            pricePerMeter={`£${(item.Price.Value / item.Space).toFixed(0)}/m2`}
                            address={item.Address}
                            description={`Semi Detached - ${item.Bedrooms} Bed - ${item.Bathrooms} Bath - ${item.Sittingrooms} Sitting`}
                            addedDate={item.TimeStamp.slice(0, 10)}
                            viewLink={item.URL}
                        />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={0}>
                {Favorites.length > 0 ? (Favorites.map((item, index) => (
                        <Propertybanner_sm
                            key={item._id}
                            Profile={user}
                            propertyId={item._id}
                            imageUrl1={item.ImageLink}
                            imageUrl2={item.PhotoURLs}
                            priceType={item.Price.Type}
                            price={`£${item.Price.Value}`}
                            size={`${item.Space}m2`}
                            Status={item.Status}
                            pricePerMeter={`£${(item.Price.Value / item.Space).toFixed(0)}/m2`}
                            address={item.Address}
                            description={`Semi Detached - ${item.Bedrooms} Bed - ${item.Bathrooms} Bath - ${item.Sittingrooms} Sitting`}
                            addedDate={item.TimeStamp.slice(0, 10)}
                            viewLink={item.URL}
                        />
                    ))) : (<div>No Saved Properties</div> )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                {savedSearches.map((search, index) => (
                <div style={{marginBottom: '20px', display:"flex", flexDirection:"column", alignItems:"flex-start"}} key={search.search._id}>
                    <h2>{search.search.Name.trim()}</h2>
                    <p>Location(s): {search.search.searchParams.locations.join(', ')}</p>
                    <p>Price Range: {search.search.searchParams.minPrice} to {search.search.searchParams.maxPrice}</p>
                    <p>Minimum Area: {search.search.searchParams.minArea} square meters</p>
                    {search.search.searchParams.beds && <p>Beds: {search.search.searchParams.beds}</p>}
                    {search.search.searchParams.baths && <p>Baths: {search.search.searchParams.baths}</p>}
                    <p>Search Results: {search.count}</p>
                    <p>New in the Last 24Hr: {search.New24}</p>
                    <Button  onClick={() => handlesearchchange(search.search)} variant="contained">Search</Button>
                </div>
            ))}
                </TabPanel>
            </div>
        </div>
    );
};

export default DetailsPanel;
