import express from "express";
import {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
} from "../controllers/meeting.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    validateCreateMeeting,
    validateUpdateMeeting,
} from "../validators/meeting.validators.js";

import validate from "../validators/validate.js";

const router = express.Router();

router.use(verifyJWT);

router
    .route("/")
    .post(validateCreateMeeting, validate, createMeeting)
    .get(getAllMeetings);

router
    .route("/:id")
    .get(getMeetingById)
    .patch(validateUpdateMeeting, validate, updateMeeting)
    .delete(deleteMeeting);

export default router;
