import  {useState} from "react";

const Propertybanner = ({imageUrl1, imageUrl2,priceType, price, size, pricePerMeter, address, description, addedDate, viewLink, isActive, toggleClass}) => {


    

return (

    <div onClick={toggleClass} style={{ cursor: "pointer" }} className={isActive ? "propertybanner active" : "propertybanner"}>
            <div className="leftsplit">
                <div className="lefttopsplit">
                    <img  src={imageUrl1}></img>
                    <img  src={imageUrl2}></img>
                </div>

                <div className="leftbottomsplit">
                    <h3>{priceType} {price}</h3>
                    <h5>{size} - {pricePerMeter}</h5>
                </div>
            </div>
            <div className="Rightsplit">
                <div><h4>{address}</h4>
                <p>{description}</p></div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"end"}}>
                    <p className="addon">Added on {addedDate} </p>
                    <a style={{marginTop:"auto", marginBottom:"auto"}} href={viewLink}>View</a>
                    </div>
            </div>
        </div>

)

}


export default Propertybanner