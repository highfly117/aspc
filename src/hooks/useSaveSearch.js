import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const useSaveSearch = (filterParams) => {
    const [SaveSearch, setData] = useState([]);
    const [saveSearcherror, setError] = useState(null);

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const BASE_URL = process.env.REACT_APP_API_URL_Properties;

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = await getAccessTokenSilently();
            try {
                console.log(accessToken, filterParams, user)
                const config = {
                    url: `${BASE_URL}/search?${filterParams}`,
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: JSON.stringify(user)
                    
                };

                const response = await axios(config);
                return response
            } catch (err) {
                setError(err);
            } finally {

            }
        };
        if (filterParams.length > 0) {
            fetchData();
        }
    }, [filterParams]); // Include sortOption in the dependency array

    return { SaveSearch, saveSearcherror };
};
