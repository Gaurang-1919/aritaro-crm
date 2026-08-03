import api from "./axios";

export const login = (data) => {
    return api.post("/auth/login", data);
};

export const register = (data) => {
    return api.post("/auth/register", data);
};

export const logout = () => {
    return api.post("/auth/logout");
};

export const getCurrentUser = () => {
    return api.get("/auth/me");
};

export const changePassword = (data) => {
    return api.post("/auth/change-password", data);
};

export const refreshToken = () => {
    return api.post("/auth/refresh-token");
};