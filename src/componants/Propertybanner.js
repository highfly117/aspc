import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";

const Propertybanner = ({
    propertyId,
    imageUrl1,
    imageUrl2,
    priceType,
    price,
    size,
    pricePerMeter,
    address,
    description,
    addedDate,
    viewLink,
    isActive,
    onClick // Use only onClick here
}) => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const handleSave = async (event) => {
        event.stopPropagation(); // Prevent onClick from being called when the button is clicked

        if (!isAuthenticated) {
            console.log("User is not authenticated.");
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            console.log(token)
            const response = await axios.post(`http://localhost:5000/api/v1/Properties/${propertyId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Property saved successfully", response.data);
        } catch (error) {
            console.error("Error saving property", error);
        }
    };

    // Directly use onClick provided by parent component for click handler
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }} className={isActive ? "propertybanner active" : "propertybanner"}>
            <div className="leftsplit">
                <div className="lefttopsplit">
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
