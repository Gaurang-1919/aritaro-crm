import api from "./axios";

// Get all leads
export const getLeads = () => {
  return api.get("/leads");
};

// Get single lead
export const getLead = (id) => {
  return api.get(`/leads/${id}`);
};

// Create lead
export const createLead = (data) => {
  return api.post("/leads", data);
};

// Update lead
export const updateLead = (id, data) => {
  return api.patch(`/leads/${id}`, data);
};

// Delete lead
export const deleteLead = (id) => {
  return api.delete(`/leads/${id}`);
};