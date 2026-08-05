import express from "express";

import {
    userRegister,
    getAllUsers,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import { validateCreateUser } from "../validators/user.validator.js";
import validate from "../validators/validate.js";

const router = express.Router();

router.use(verifyJWT);

// Get all users
router.get(
    "/",
    authorize("admin", "manager"),
    getAllUsers
);

// Register user
router.post(
    "/register",
    authorize("admin"),
    validateCreateUser,
    validate,
    userRegister
);

export default router;