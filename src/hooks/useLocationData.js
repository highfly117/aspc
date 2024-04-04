import { useState, useEffect } from 'react';
import { fetchLocations } from '../utils/api';
import axios from 'axios';

export const useLocationData = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchLocations();
                let areaCounter = 1; 
                
                const fetchedLocations = response.data.flatMap(doc =>
                    Object.values(doc.Areas).map(areaName => ({
                        value: areaName, // Increment counter for each area
                        label: areaName
                    }))
                );
                // Sort the locations by their label
                fetchedLocations.sort((a, b) => a.label.localeCompare(b.label));
                
                setLocations(fetchedLocations);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    return { locations, loading, error };
};
