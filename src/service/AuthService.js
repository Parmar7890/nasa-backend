import axios from "../api/axiosConfig";


export const registerUser = async (user) => {
    const response = await axios.post("/auth/register", user);
    return response.data;
}

export const loginUser = async (user) => {
    const response = await axios.post("/auth/login", user);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await axios.get("/auth/profile");
    return response.data
}