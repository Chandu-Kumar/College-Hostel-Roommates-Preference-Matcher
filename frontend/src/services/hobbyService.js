import api from "../api/api";

export const getHobbies = async () => {
  const response = await api.get("/hobbies/me");
  return response.data;
};

export const createHobbies = async (data) => {
  const response = await api.post("/hobbies", data);
  return response.data;
};

export const updateHobbies = async (data) => {
  const response = await api.put("/hobbies", data);
  return response.data;
};