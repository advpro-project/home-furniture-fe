import axios from 'axios';


const API_BASE_URL = 'http://35.226.59.207';

export const getFurnitures = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/furniture/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching furnitures:', error);
        throw error;
    }
};

