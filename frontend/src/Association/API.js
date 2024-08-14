import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/Association/';  // Replace with your actual API URL

// Create
export const createAssociationAPI = async (data) => {
    return await axios.post(API_URL, data);
};

// Read (Get all Associations)
export const getAssociations = async () => {
    return await axios.get(API_URL);
};

// Read (Get a single Association by ID)
export const getAssociationById = async (id) => {
    return await axios.get(`${API_URL}${id}/`);
};

// Update
export const updateAssociation = async (id, data) => {
    return await axios.put(`${API_URL}${id}/`, data);
};

// Delete
export const deleteAssociation = async (id) => {
    return await axios.delete(`${API_URL}${id}/`);
};
