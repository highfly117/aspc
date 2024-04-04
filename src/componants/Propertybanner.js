import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import { getProtectedResource } from "../utils/api";

const Propertybanner = ({
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
        <div onClick={onClick} style={{ cursor: "pointer" }} className={isActive ? "propertybanner active" : "propertybanner"}>
            <div className="leftsplit">
                <div className="lefttopsplit">
                    <div className="PropertyStatus">{Status.Type === "None" ? "" : Status.Type }</div>
                    {imageUrl1 && <img className="firstimage" alt="house 1" src={imageUrl1 + "?width=149&quality=85&autorotate=true&quot"} />}
                    {imageUrl2?.[1] && <img className="secondimage" alt="House 2" src={imageUrl2[1] + "?width=149&quality=85&autorotate=true&quot"} />}
                </div>
                <div className="leftbottomsplit">
                    <h3>{priceType} {price}</h3>
                    <h5>{size} - {pricePerMeter}</h5>
                </div>
            </div>
            <div className="Rightsplit">
                <div className="Righttopsplit">
                    <div className="Righttopleft">
                        <h4>{address}</h4>
                        <p>{description}</p>
                    </div>
                    <div className="RighttopRight">
                        <button onClick={handleSave}>Save</button>
                    </div>

                </div>
                <div className="RightbottomSplit" style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                    <p className="addon">Added on {addedDate}</p>
                    <a style={{ marginTop: "auto", marginBottom: "5px" }} href={viewLink} target="_blank" rel="noopener noreferrer">View</a>
                </div>
            </div>
        </div>
    );
};

export default Propertybanner;
