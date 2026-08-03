import api from "./axios";

export const createUser = (data) =>
    api.post("/users/register", data);