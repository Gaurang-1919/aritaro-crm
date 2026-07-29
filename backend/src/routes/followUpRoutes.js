import express from "express";
import {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUp.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(createFollowUp).get(getAllFollowUps);

router
  .route("/:id")
  .get(getFollowUpById)
  .patch(updateFollowUp)
  .delete(deleteFollowUp);

export default router;
