import api from "../api/api";

export const getMatches = async () => {
    const response = await api.get("/matches");
    return response.data;
};