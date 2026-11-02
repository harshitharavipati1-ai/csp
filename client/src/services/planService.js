import API from './api';

export const suggestRotation = async (plannerData) => {
    const response = await API.post('/rotation/suggest', plannerData);
    return response.data;
};

export const createPlan = async (planData) => {
    const response = await API.post('/plans', planData);
    return response.data;
};

export const getPlans = async (all = false) => {
    const response = await API.get('/plans', { params: { all } });
    return response.data;
};

export const getPlanById = async (id) => {
    const response = await API.get(`/plans/${id}`);
    return response.data;
};

export const updatePlan = async (id, planData) => {
    const response = await API.put(`/plans/${id}`, planData);
    return response.data;
};

export const deletePlan = async (id) => {
    const response = await API.delete(`/plans/${id}`);
    return response.data;
};
