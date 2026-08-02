import api from "./axios";

export const getMeetings = () =>
    api.get("/meetings");

export const getMeeting = (id) =>
    api.get(`/meetings/${id}`);

export const createMeeting = (data) =>
    api.post("/meetings", data);

export const updateMeeting = (id,data) =>
    api.patch(`/meetings/${id}`, data);

export const deleteMeeting = (id) =>
    api.delete(`/meetings/${id}`);