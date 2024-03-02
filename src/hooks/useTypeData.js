import { useState, useEffect } from 'react';
import { fetchTypes } from '../utils/api';

export const useTypeData = (url) => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                
                const response = await fetchTypes();
                const fetchedTypes = response.data.map(type => ({
                    value: type, // Use the type string as the value
                    label: type  // Use the type string as the label
                }));

                setTypes(fetchedTypes); // Assuming you have a setTypes function to update your state
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { types, loading, error };
};
