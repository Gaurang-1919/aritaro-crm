import api from "./axios";

export const createUser = (data) => {
  return api.post("/users/register", data);
};

export const getUsers = (role = "") => {
  if (role) {
    return api.get(`/users?role=${role}`);
  }
  return api.get("/users");
};