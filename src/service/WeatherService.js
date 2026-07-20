import axios from '../api/axiosConfig';

export const getWeatherData = async (city) => {
    const response = await axios.get(`/weather/${city}`);
    return response.data;
}