import api from "./axios";

export const getFollowUps = () =>
  api.get("/follow-up");

export const getFollowUp = (id) =>
  api.get(`/follow-up/${id}`);

export const createFollowUp = (data) =>
  api.post("/follow-up", data);

export const updateFollowUp = (id, data) =>
  api.patch(`/follow-up/${id}`, data);

export const deleteFollowUp = (id) =>
  api.delete(`/follow-up/${id}`);