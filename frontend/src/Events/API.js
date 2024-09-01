import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/Event/';  // Replace with your actual API URL

// Create
export const createEventAPI = async (data) => {
    return await axios.post(API_URL, data);
};

// Read (Get all Events)
export const getEvents = async () => {
    return await axios.get(API_URL);
};

// Read (Get a single Event by ID)
export const getEventById = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

// Update
export const updateEvent = async (id, data) => {
    return await axios.patch(`${API_URL}${id}/`, data);
};

// Delete
export const deleteEvent = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
