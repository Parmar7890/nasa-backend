import axios from "../api/axiosConfig";


export const getLatestImage = async () => {
    const response = await axios.get("/nasa/earth");
    return response.data;
}

export const getLast10Images = async () => {
    const response = await axios.get("/nasa/images");
    console.log(response.data)
    return response.data;
}
