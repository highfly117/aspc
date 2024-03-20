import React from "react";

import GoogleMapProperties from "./GoogleMap";
import MemoizedWeatherMap from "./Mapbox"

const DetailsPanel = ({
    data,
    MapLocations
}) => {

    console.log(MapLocations)

    return (

        <div className="detailsPanel">
        <div className="Mapbox">
            {data.length > 0 ? (
                <MemoizedWeatherMap locations={MapLocations} />
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    </div>

    )

}

export default DetailsPanel