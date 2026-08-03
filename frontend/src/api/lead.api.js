import api from "./axios";

export const getLeads = (params) => {
    return api.get("/leads", {
        params
    });
};

export const getLead = (id) => {
    return api.get(`/leads/${id}`);
};

export const createLead = (data) => {
    return api.post("/leads", data);
};

export const updateLead = (id, data) => {
    return api.patch(`/leads/${id}`, data);
};

export const deleteLead = (id) => {
    return api.delete(`/leads/${id}`);
};