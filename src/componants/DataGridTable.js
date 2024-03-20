import { useState } from "react";
import Propertybanner from "./Propertybanner"; // Ensure this matches the file and component name exactly
import "../CSS/DataGridTable.css";

const DataGridTable = ({
    data,
    onSelectItem
}) => {
    const [activeBanner, setActiveBanner] = useState(null);

    const toggleActiveBanner = (id) => {

        const isSelectedBannerBeingDeactivated = activeBanner === id;
        setActiveBanner(isSelectedBannerBeingDeactivated ? null : id);
        onSelectItem(isSelectedBannerBeingDeactivated ? null : data[id]);
    };

    return (
        <div style={{ width: "50%", marginRight: "30px" }} className="dataTable">
            {data.slice(0, 100).map((item, index) => {
                
                return (
                    <Propertybanner
                        key={item._id}
                        imageUrl1={item.ImageLink}
                        imageUrl2={item.PhotoURLs}
                        priceType={item.Price.Type}
                        price={`£${item.Price.Value}`}
                        size={`${item.Space}m2`}
                        pricePerMeter={`£${(item.Price.Value / item.Space).toFixed(0)}/m2`}
                        address={item.Address}
                        description={`Semi Detached - ${item.Bedrooms} Bed - ${item.Bathrooms} Bath - ${item.Sittingrooms} Sitting`}
                        addedDate={item.TimeStamp.slice(0, 10)}
                        viewLink={item.URL}
                        isActive={activeBanner === index}
                        toggleClass={() => toggleActiveBanner(index)}
                        onClick={() => onSelectItem(item)}
                    />
                );
            })}
        </div>
    );
};

export default DataGridTable;
