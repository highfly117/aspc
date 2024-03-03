import { useState } from "react";

const Propertybanner = ({ imageUrl1, imageUrl2, priceType, price, size, pricePerMeter, address, description, addedDate, viewLink, isActive, toggleClass, onClick }) => {

    const handleClick = () => {
        toggleClass(); // Toggle active class
        onClick(); // Additional onClick action (e.g., setting map location)
    };



    return (

        <div onClick={handleClick} style={{ cursor: "pointer" }} className={isActive ? "propertybanner active" : "propertybanner"}>
            <div className="leftsplit">
                <div className="lefttopsplit">
                    {
                        imageUrl1 && <img className="firstimage" src={imageUrl1} />}
                    {
                        imageUrl2?.[1] && <img className="secondimage" src={imageUrl2[1]} alt="Description" />
                    }
                </div>

                <div className="leftbottomsplit">
                    <h3>{priceType} {price}</h3>
                    <h5>{size} - {pricePerMeter}</h5>
                </div>
            </div>
            <div className="Rightsplit">
                <div><h4>{address}</h4>
                    <p>{description}</p></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                    <p className="addon">Added on {addedDate} </p>
                    <a style={{ marginTop: "auto", marginBottom: "5px" }} href={viewLink}>View</a>
                </div>
            </div>
        </div>

    )

}


export default Propertybanner