import api from "./axios";

export const getFollowUps = () =>
    api.get("/followups");

export const getFollowUp = (id) =>
    api.get(`/followups/${id}`);

export const createFollowUp = (data) =>
    api.post("/followups",data);

export const updateFollowUp = (id,data)=>
    api.patch(`/followups/${id}`,data);

export const deleteFollowUp = (id)=>
    api.delete(`/followups/${id}`);