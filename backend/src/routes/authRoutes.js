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
const router = express.Router();

//Public Routes//

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

//Protected Routes//

router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/change-password", verifyJWT, changePassword);

export default router;