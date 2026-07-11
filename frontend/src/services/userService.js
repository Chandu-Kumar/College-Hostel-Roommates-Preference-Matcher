import api from "../api/api";

export const getUserProfile = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};