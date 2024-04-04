import { useState, useEffect } from "react";
import axios from "axios";

export const usePropertyData = (url, transformPropertyData, filterParams, sortOption = 'Recent') => {
    const [data, setData] = useState([]);
    const [MapLocations, setMapLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count, setCount] = useState('')
 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Construct the query string from filterParams and include sortOption
                const params = new URLSearchParams(filterParams);
                // Assuming your backend API expects a 'sort' query parameter for sorting
                params.set('sort', sortOption ); // This replaces any existing 'sort' parameter
                const queryString = params.toString();
                const fullUrl = `${url}?${queryString}`;
                console.log(fullUrl)
                const response = await axios.get(fullUrl);
                const transformedData = transformPropertyData(response.data.documents);
                setData(transformedData);
                setMapLocations(transformedData);
                setCount(response.data.count)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, transformPropertyData, JSON.stringify(filterParams), sortOption]); // Include sortOption in the dependency array

    return { data, MapLocations, count, loading, error };
};
