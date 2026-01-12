import axios from './axiosInstance'; // your axios setup with baseURL

export const fetchCurrentUser = async () => {
    const response = await axios.get('/users/me'); // Adjust endpoint to your backend
    return response.data;
};
