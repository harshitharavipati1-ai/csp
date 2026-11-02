import API from './api';

export const getAdminStats = async () => {
    const response = await API.get('/admin/stats');
    return response.data;
};

export const getUsers = async () => {
    const response = await API.get('/users');
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await API.put(`/users/${id}/role`, { role });
    return response.data;
};
