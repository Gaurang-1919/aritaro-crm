import express from "express";
import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from "../controllers/meeting.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(createMeeting).get(getAllMeetings);

router
  .route("/:id")
  .get(getMeetingById)
  .patch(updateMeeting)
  .delete(deleteMeeting);

export default router;
