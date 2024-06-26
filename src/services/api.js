import axios from 'axios';

const API_URL = import.meta.env.VITE_URL_API;

const getTurnos = async () => {
    try {
        const response = await axios.get(`${API_URL}/turnos`);
        // const response = await axios.get(`${API_URL}/select?fecha=${'25/04/2024'}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching turnos:', error);
        throw error;
    }
};

const addComment = async (data) => {
    const response = await axios.post(`${API_URL}/comment`, data)
    return response.data;
};

export default { getTurnos, addComment };
