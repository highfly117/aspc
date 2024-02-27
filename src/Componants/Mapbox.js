import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet'

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
    if (location.postition && location.postition.lat && location.postition.lng) {
      totalLat += location.postition.lat;
      totalLng += location.postition.lng;
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


  console.log(props)

  const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [12.5, 20.5],
    shadowSize: [20.5, 20.5],
    iconAnchor: [6.5, 20.5],
    shadowAnchor: [2, 31],
    popupAnchor: [1, -17]
  });
  

  const position = props.locations.length === 1 ? [props.locations[0].postition.lat, props.locations[0].postition.lng] :
    findGeographicCentroid(props.locations);

  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGlnaGZseTExNyIsImEiOiJjbGluNWR4amUwbDk5M2txcjcybTRpbGo0In0.pdrbNFR2lyks_o2aQizU9Q';
  const MAPBOX_URL = `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;



  return (
    <div style={{ width: "100%", height: "50%" }}>

      <MapContainer
        style={{ width: '100%', height: '100%' }}
        className="full-height-map"
        center={position}
        zoom={11}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}
      >
        <ChangeView center={position} zoom={11} />
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          url={MAPBOX_URL}
        />
        {props.locations.map((location, index) => {
          // Split the address and extract the first and last parts
          const addressParts = location.Address.split(",");
          const firstAddressPart = addressParts[0]; // First part
          const lastAddressPart = addressParts[addressParts.length - 1].trim(); // Last part, with trim to remove any whitespace

          return (
            <Marker
              key={index} // Using a unique identifier from your data would be better if available
              position={[
                location.postition?.lat || 0, // Use optional chaining with a fallback value
                location.postition?.lng || 0  // Use optional chaining with a fallback value, corrected the typo 'postition' to 'position'
              ]}

              icon={defaultIcon}
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

                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
    </div >
  );
};

export default WeatherMap;
