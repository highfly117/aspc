import { useState, useEffect } from 'react';
import { fetchStatus } from '../utils/api';

export const useStatusData = (url) => {
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchStatus()
                const fetchedStatus = response.data.map(status => ({
                    value: status, // Use the type string as the value
                    label: status  // Use the type string as the label
                }));
                
                setStatus(fetchedStatus); // Assuming you have a setTypes function to update your state
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { status, loading, error };
};
