import api from "../api/api";

export const getProfile = async () => {
    const response = await api.get("/profile/me");
    return response.data;
};

export const createProfile = async (data) => {
    const response = await api.post("/profile", data);
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.put("/profile", data);
    return response.data;
};