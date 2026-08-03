import api from "./axios";

export const getActivities = () =>
    api.get("/activities");

export const createActivity = (data)=>
    api.post("/activities",data);