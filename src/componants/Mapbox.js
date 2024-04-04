import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import "../../node_modules/leaflet/dist/leaflet.css"


const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

function findGeographicCentroid(locations) {
  let totalLat = 0;
  let totalLng = 0;
  let count = 0;

  locations.forEach(location => {
    if (location.postition && location.postition.Latitude && location.postition.Longitude) {
      totalLat += location.postition.Latitude;
      totalLng += location.postition.Longitude;
      count++;
    }
  });

  if (count === 0) {
    return null; // Return null if no valid positions found
  }

  const centroid = [
    totalLat / count,
    totalLng / count
  ];

  

  return centroid;
}


const WeatherMap = (props) => {
  const [mapStyle, setMapStyle] = useState("outdoors-v12");
  

  const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [12.5, 20.5],
    shadowSize: [20.5, 20.5],
    iconAnchor: [6.5, 20.5],
    shadowAnchor: [2, 31],
    popupAnchor: [1, -17]
  });

  
  const position = props.locations.length === 1 ? [props.locations[0].postition.Latitude, props.locations[0].postition.Longitude] :
  [57.295638388137146, -2.299246186296439];
  const zoomNum = props.locations.length === 500 ? 8.7 : (props.locations.length === 1 ? 14 : 12);

  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGlnaGZseTExNyIsImEiOiJjbGluNWR4amUwbDk5M2txcjcybTRpbGo0In0.pdrbNFR2lyks_o2aQizU9Q';
  const MAPBOX_URL = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;

  const handleStyleChange = (newStyle) => {
    setMapStyle(newStyle);
    console.log(newStyle)
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      

      <FormControl className='MapStyle'>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => handleStyleChange(e.target.value)}
        value={mapStyle}
      >
        <FormControlLabel value="outdoors-v12" control={<Radio />} label="Light" />
        <FormControlLabel value="satellite-streets-v12" control={<Radio />} label="Satellite" />
        <FormControlLabel value="navigation-night-v1" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
      <MapContainer
        style={{ width: '100%', height: '100%',top:"-35px"}}
        className="full-height-map"
        center={position}
        zoom={zoomNum}
        minZoom={1}
        maxZoom={18}
        maxNativeZoom = {18}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}
      >
        <ChangeView center={position} zoom={zoomNum} />
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          url={MAPBOX_URL}
          minZoom={1}
          maxZoom={18}
        />
        {props.locations.map((location, index) => {
          // Split the address and extract the first and last parts
          
          const addressParts = location.Address.split(",");
          const firstAddressPart = addressParts[0]; // First part
          const lastAddressPart = addressParts[addressParts.length - 1].trim(); // Last part, with trim to remove any whitespace
          let imgSrc;
          switch (location.Type) {
            case 'flat':
              imgSrc = require('../Assets/apartments.png');
              break;
            case 'semi-detached':
              imgSrc = require('../Assets/townhouse.png'); // Update path accordingly
              break;
            case 'terrace':
              imgSrc = require('../Assets/terrace.png'); // Update path accordingly
              break;
            case 'house':
              imgSrc = require('../Assets/house1.png');
              break;
            default:
              imgSrc = 'path/to/default-image.png'; // Fallback image path
          }

          const customIcon = new L.Icon({
            iconUrl: imgSrc,
            iconSize: [28, 28], // Adjust based on your image's dimensions
            iconAnchor: [12, 41], // Adjust if necessary to position the tip of the icon at the marker's location
            popupAnchor: [1, -34], // Adjust if necessary
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            shadowSize: [28, 28],
            shadowAnchor: [12, 41],
          });


          return (
            <Marker
              key={index} // Using a unique identifier from your data would be better if available
              position={[
                location.postition?.Latitude || 0, // Use optional chaining with a fallback value
                location.postition?.Longitude || 0  // Use optional chaining with a fallback value, corrected the typo 'postition' to 'position'
              ]}

              icon={customIcon}
            >
              <Popup >
                <div style={{ lineHeight: 0.7 }}> {/* Adjusted lineHeight for better readability */}
                  <h3>{firstAddressPart}, {lastAddressPart}</h3> {/* Display first and last parts */}
                  <h4>{location.Type}</h4>
                </div>
                <div >
                  <div><h4>{location.Space} m2</h4></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <h1>£{(location.PriceValue || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h1>
                    <img src={location.ImageLink || "https://cdn.aspc.co.uk/resources/office/Property/368336/Image/5645450.jpg"} width={"50%"} alt="Property"></img></div>
                  <a href={location.URL}>View</a>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
    </div >
  );
};

const MemoizedWeatherMap = React.memo(WeatherMap);

export default MemoizedWeatherMap;
