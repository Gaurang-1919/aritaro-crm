import api from "./axios";

export const getLeads = () =>
  api.get("/leads");

export const getLead = (id) =>
  api.get(`/leads/${id}`);

export const createLead = (data) =>
  api.post("/leads", data);

export const updateLead = (id, data) =>
  api.patch(`/leads/${id}`, data);

export const deleteLead = (id) =>
  api.delete(`/leads/${id}`);