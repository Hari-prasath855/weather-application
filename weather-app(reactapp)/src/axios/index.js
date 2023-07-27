import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});
  
// Default error handler
const errorHandler = (error) => {
    console.error('API Error:', error);
    throw error;
};

// Custom GET method
export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        errorHandler(error);
    }
};
