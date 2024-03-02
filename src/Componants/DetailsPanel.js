import React from "react";
import WeatherMap from "./Mapbox";
const DetailsPanel = ({
    data,
    MapLocations
}) => {

    return (

        <div className="detailsPanel">
        <div className="Mapbox">
            {data.length > 0 ? (
                <WeatherMap locations={MapLocations} />
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    </div>

    )

}

export default DetailsPanel