import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/Log/';  // Replace with your actual API URL

// Create
export const createLogAPI = async (data) => {
    return await axios.post(API_URL, data);
};

// Read (Get all Logs)
export const getLogs = async () => {
    return await axios.get(API_URL);
};

// Read (Get a single Log by ID)
export const getLogById = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

// Update
export const updateLog = async (id, data) => {
    return await axios.put(`${API_URL}${id}/`, data);
};

// Delete
export const deleteLog = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
