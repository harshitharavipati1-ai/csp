import API from './api';

export const getCrops = async (params = {}) => {
    const response = await API.get('/crops', { params });
    return response.data;
};

export const getCropById = async (id) => {
    const response = await API.get(`/crops/${id}`);
    return response.data;
};

export const createCrop = async (cropData) => {
    const response = await API.post('/crops', cropData);
    return response.data;
};

export const updateCrop = async (id, cropData) => {
    const response = await API.put(`/crops/${id}`, cropData);
    return response.data;
};

export const deleteCrop = async (id) => {
    const response = await API.delete(`/crops/${id}`);
    return response.data;
};
