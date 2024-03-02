import  {useState} from "react";
import Propertybanner from "./Propertybanner"; // Ensure this matches the file and component name exactly
import "../CSS/DataGridTable.css";

const DataGridTable = ({
    data,
}) => {
    const [activeBanner, setActiveBanner] = useState(null);

    const toggleActiveBanner = (id) => {
        setActiveBanner(activeBanner === id ? null : id);
    };

    return (
        <div style={{width:"50%", marginRight:"30px"}} className="dataTable">
            {data.slice(0, 100).map((item, index) => (
                <Propertybanner // Make sure this matches your import and component definition
                    key={index}
                    imageUrl1={item.ImageLink} // Assuming each item has an ImageLink property
                    imageUrl2={item.ImageLink} // You might want to use different properties for different images
                    priceType ={item.Price.Type}
                    price={`£${item.Price.Value}`} // Assuming PriceValue is the property and formatting it as needed
                    size={`${item.Space}m2`}
                    pricePerMeter={`£${(item.PriceValue / item.Space).toFixed(0)}/m2`} // Calculating and formatting price per meter squared
                    address={item.Address}
                    description={`Semi Detached - ${item.Bedrooms} Bed - ${item.Bathrooms} Bath - ${item.Sittingrooms} Sitting`} // Assuming these properties exist
                    addedDate={item.TimeStamp.slice(0, 10)} // Assuming TimeStamp exists and slicing for date format
                    viewLink={item.URL}
                    isActive={activeBanner === index}
                    toggleClass={() => toggleActiveBanner(index)}
                />
            ))}
        </div>
    );
};

export default DataGridTable;
