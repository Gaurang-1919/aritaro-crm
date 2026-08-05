import api from "./axios";

export const getConversations = () =>
  api.get("/conversation");

export const getConversation = (id) =>
  api.get(`/conversation/${id}`);

export const createConversation = (data) =>
  api.post("/conversation", data);

export const updateConversation = (id, data) =>
  api.patch(`/conversation/${id}`, data);

export const deleteConversation = (id) =>
  api.delete(`/conversation/${id}`);