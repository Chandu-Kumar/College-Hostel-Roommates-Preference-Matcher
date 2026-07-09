import api from "../api/api";

export const getPreference = async () => {
    const response = await api.get("/preferences/me");
    return response.data;
};

export const createPreference = async (data) => {
    const response = await api.post("/preferences", data);
    return response.data;
};

export const updatePreference = async (data) => {
    const response = await api.put("/preferences", data);
    return response.data;
};