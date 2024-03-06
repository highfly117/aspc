import React from "react";

import GoogleMapProperties from "./GoogleMap";
const DetailsPanel = ({
    data,
    MapLocations
}) => {

    return (

        <div className="detailsPanel">
        <div className="Mapbox">
            {data.length > 0 ? (
                <GoogleMapProperties locations={MapLocations} />
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    </div>

    )

}

export default DetailsPanel