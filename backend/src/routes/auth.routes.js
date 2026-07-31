import express from "express";
import {
    register,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    validateRegister,
    validateLogin,
    validateChangePassword,
} from "../validators/auth.validator.js";

import validate from "../validators/validate.js";

const router = express.Router();

// Public Routes //
router.post(
    "/register",
    validateRegister,
    validate,
    register
);

router.post(
    "/login",
    validateLogin,
    validate,
    login
);

router.post("/refresh-token", refreshAccessToken);

// Protected Routes //
router.post("/logout", verifyJWT, logout);

router.get("/me", verifyJWT, getCurrentUser);

router.post(
    "/change-password",
    verifyJWT,
    validateChangePassword,
    validate,
    changePassword
);

export default router;