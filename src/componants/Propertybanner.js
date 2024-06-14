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
    Type,
    Bathrooms,
    Bedrooms,
    Sittingrooms,
    addedDate,
    viewLink,
    isActive,
    onClick // Use only onClick here
}) => {

    const { getAccessTokenSilently } = useAuth0();
    let imgSrc;
    const bedSrc = require('../Assets/double-bed.png');
    const toiletSrc = require('../Assets/toilet.png')
    const sofaSrc = require('../Assets/seater-sofa.png')
    const homesave = require('../Assets/home.png')
    switch (Type) {
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

    const getStatusClassName = (statusType) => {
        if (statusType === 'None') {
            return ''; // No class needed for 'None'
        } else if (statusType === 'Under offer') {
            return 'UnderOffer'; // Assuming 'underOffer' is the class for items under offer
        } else if (statusType.includes('Closing')) {
            return 'Closing'; // For any status that includes "Closing"
        } else if (statusType.includes('Sold')) {
            return 'Sold'; // For any status that includes "Sold"
        } else {
            return 'defaultClass'; // Fallback class if needed
        }
    }

    const handleSave = async (event) => {

        try {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getProtectedResource(accessToken, propertyId, Profile);

            console.log("Property saved successfully", data);
        } catch (error) {
            console.error("Error saving property", error);
        }
    };


    const formatPrice = (price) => {
        const number = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        return new Intl.NumberFormat('en-UK', { 
          style: 'currency', 
          currency: 'GBP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0 
        }).format(number);
      };



    // Directly use onClick provided by parent component for click handler
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }} className={isActive ? "propertybanner active" : "propertybanner"}>
            <div className="leftsplit">
                <div className="lefttopsplit">
                    <div className={`PropertyStatus${getStatusClassName(Status.Type)}`}>
                        {Status.Type === "None" ? "" : Status.Type}
                    </div>
                    {imageUrl1 && <img className="firstimage" alt="house 1" src={imageUrl1 + "?width=149&quality=85&autorotate=true&quot"} />}
                    {imageUrl2?.[1] && <img className="secondimage" alt="House 2" src={imageUrl2[1] + "?width=149&quality=85&autorotate=true&quot"} />}
                </div>
                <div className="leftbottomsplit">
                    <h3>{priceType} {formatPrice(price)}</h3>

                </div>
            </div>
            <div className="Rightsplit">
                <div className="Righttopsplit">
                    <div className="Righttopleft">
                        <h4 className="min-widthclass">{address}</h4>
                        <div style={{ display: "flex", alignItems: "end" }}>
                            <img className="PropertyClass" src={imgSrc} alt={Type}></img>
                            <img className="roomnumbers" src={bedSrc} alt={Bedrooms}></img>
                            <p className="spacer">{Bedrooms}</p>
                            <img className="roomnumbers" src={toiletSrc} alt={Bathrooms}></img>
                            <p className="spacer">{Bathrooms}</p>
                            <img className="roomnumbers" src={sofaSrc} alt={Sittingrooms}></img>
                            <p className="spacer">{Sittingrooms}</p>
                        </div>
                    </div>
                    <div className="RighttopRight">
                        <img width={36} src={homesave} alt="Save" onClick={handleSave}></img>
                    </div>

                </div>
                <div className="RightbottomSplit" style={{ display: "flex", alignItems: "end" }}>
                    <p className="addon">Added on {addedDate}</p>
                    <p className="sqm2">{size} - {pricePerMeter}</p>
                    <a style={{ marginTop: "auto", marginBottom: "5px", position: "absolute", right: "35px",fontWeight:"700", textDecorationLine:"none" }} href={viewLink} target="_blank" rel="noopener noreferrer">View</a>
                </div>
            </div>
        </div>
    );
};

export default Propertybanner;
