import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import { getProtectedResource } from "../utils/api";

const Propertybanner_sm = ({
    propertyId,
    Profile,
    imageUrl1,
    imageUrl2,
    priceType,
    price,
    size,
    Status,
    pricePerMeter,
    address,
    description,
    addedDate,
    viewLink,
    isActive,
    onClick // Use only onClick here
}) => {

    const { getAccessTokenSilently } = useAuth0();

    const handleSave = async (event) => {
        

        try {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getProtectedResource(accessToken, propertyId, Profile);

            console.log("Property saved successfully", data);
        } catch (error) {
            console.error("Error saving property", error);
        }
    };

    

    

    // Directly use onClick provided by parent component for click handler
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }} className={isActive ? "propertybanner_sm active_sm" : "propertybanner_sm"}>
            <div className="leftsplit_sm">
                <div className="lefttopsplit_sm">
                    <div className="PropertyStatus_sm">{Status.Type === "None" ? "" : Status.Type }</div>
                    {imageUrl1 && <img className="firstimage_sm" alt="house 1" src={imageUrl1 + "?width=75&quality=85&autorotate=true&quot"} />}
                    {imageUrl2?.[1] && <img className="secondimage_sm" alt="House 2" src={imageUrl2[1] + "?width=75&quality=85&autorotate=true&quot"} />}
                </div>
                <div className="leftbottomsplit_sm">
                    <h3>{priceType} {price}</h3>
                </div>
            </div>
            <div className="Rightsplit_sm">
                <div className="Righttopsplit_sm">
                    <div className="Righttopleft_sm">
                        <h4>{address}</h4>
                        <p>{description}</p>
                    </div>
                    <div className="RighttopRight_sm">
                        <button onClick={handleSave}>Remove</button>
                        <a style={{ marginTop: "auto", marginBottom: "5px", fontSize:"12px" }} href={viewLink} target="_blank" rel="noopener noreferrer">View</a>
                    </div>
    
                </div>
            </div>
        </div>
    );
    
};

export default Propertybanner_sm;
