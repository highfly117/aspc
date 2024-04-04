import { useState, useEffect } from "react";
import axios from "axios";

export const useNew = (transformPropertyData) => {
    const [New, setNew] = useState([]);
    const [Newloading, setLoading] = useState(false);
    const [Newerror, setError] = useState(null);


    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const fullUrl = process.env.REACT_APP_API_URL_Properties + "/new";
                const response = await axios.get(fullUrl);
                const transformedData = transformPropertyData(response.data);
                setNew(transformedData);
                
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [] ); // Include sortOption in the dependency array

    return {New, Newloading, Newerror };
};
