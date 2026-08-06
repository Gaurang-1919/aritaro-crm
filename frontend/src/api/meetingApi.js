import api from "./axios";

export const getMeetings = () =>
  api.get("/meeting");

export const getMeeting = (id) =>
  api.get(`/meeting/${id}`);

export const createMeeting = (data) =>
  api.post("/meeting", data);

export const updateMeeting = (id, data) =>
  api.patch(`/meeting/${id}`, data);

export const deleteMeeting = (id) =>
  api.delete(`/meeting/${id}`);