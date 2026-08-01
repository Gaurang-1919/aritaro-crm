import express from "express";
import userRegister from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import { validateCreateUser } from "../validators/user.validator.js";
import validate from "../validators/validate.js";

const router = express.Router();

router.post(
    "/register",
    verifyJWT,
    authorize("admin"),
    validateCreateUser,
    validate,
    userRegister
);

export default router;