import { useState } from "react";
import Propertybanner from "./Propertybanner"; // Ensure this matches the file and component name exactly
import "../MobileCSS/DataGridTable.css";
import { useAuth0 } from "@auth0/auth0-react";

const DataGridTable = ({
    data,
    onSelectItem
}) => {
    const [activeBanner, setActiveBanner] = useState(null);
    const {user} = useAuth0();

    console.log(data)

    const handleBannerClick = (id, item) => {
        const isSelectedBannerBeingDeactivated = activeBanner === id;
        console.log(isSelectedBannerBeingDeactivated);

        // Set the active banner. If it's already active, deactivate it.
        setActiveBanner(isSelectedBannerBeingDeactivated ? null : id);

        // Call onSelectItem with the item if activating, or with null if deactivating
        onSelectItem(isSelectedBannerBeingDeactivated ? null : item);
    };

    

    return (
        <div  className="dataTable">
            {data.map((item, index) => (
                <Propertybanner
                    key={item._id}
                    Profile={user}
                    propertyId={item._id}
                    imageUrl1={item.ImageLink}
                    imageUrl2={item.PhotoURLs}
                    priceType={item.Price.Type}
                    price={`£${item.Price.Value}`}
                    size={`${item.Space}m2`}
                    Status={item.Status}
                    pricePerMeter={`£${(item.Price.Value / item.Space).toFixed(0)}/m2`}
                    address={item.Address}
                    description={`Semi Detached - ${item.Bedrooms} Bed - ${item.Bathrooms} Bath - ${item.Sittingrooms} Sitting`}
                    Type={item.Type}
                    Bathrooms={item.Bathrooms}
                    Bedrooms={item.Bedrooms}
                    Sittingrooms={item.Sittingrooms}
                    addedDate={item.TimeStamp.slice(0, 10)}
                    viewLink={item.URL}
                    isActive={activeBanner === index}
                    onClick={() => handleBannerClick(index, item)} // Consolidate handlers here
                />
            ))}
        </div>
    );
};

export default DataGridTable;
