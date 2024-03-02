import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL_Properties;

export const fetchProperties = async (queryParams) => {
    console.log(queryParams)
    console.log(`${BASE_URL}/datafilter?`, { params: queryParams })
    const response = await axios.get(`${BASE_URL}/datafilter?${queryParams}`);
    console.log(response)
    return response;
};

export const fetchLocations = async () => {
    const response = await axios.get(`${BASE_URL}/postcodes`);
    return response;
};

export const fetchTypes = async () => {
    const response = await axios.get(`${BASE_URL}/types`);
    return response;
};

export const fetchStatus = async () => {
    const response = await axios.get(`${BASE_URL}/status`);
    return response;
};
