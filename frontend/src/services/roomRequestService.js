import api from "../api/api";

export const sendRoomRequest = async (receiverId) => {
    const response = await api.post(`/room-requests/${receiverId}`);
    return response.data;
};

export const getSentRequests = async () => {
    const response = await api.get("/room-requests/sent");
    return response.data;
};

export const getReceivedRequests = async () => {
    const response = await api.get("/room-requests/received");
    return response.data;
};

export const acceptRequest = async (requestId) => {
    const response = await api.put(
        `/room-requests/${requestId}/accept`
    );
    return response.data;
};

export const rejectRequest = async (requestId) => {
    const response = await api.put(
        `/room-requests/${requestId}/reject`
    );
    return response.data;
};