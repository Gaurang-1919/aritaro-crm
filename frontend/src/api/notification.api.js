import api from "./axios";

export const getNotifications = () =>
    api.get("/notifications");

export const updateNotification = (id,data)=>
    api.patch(`/notifications/${id}`,data);