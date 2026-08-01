import express from "express";
import {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUp.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import {
  validateCreateFollowUp,
  validateUpdateFollowUp,
} from "../validators/followUp.validator.js";
import validate from "../validators/validate.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .post(validateCreateFollowUp, validate, createFollowUp)
  .get(getAllFollowUps);

router
  .route("/:id")
  .get(getFollowUpById)
  .patch(validateUpdateFollowUp, validate, updateFollowUp)
  .delete(authorize("admin"), deleteFollowUp);

export default router;
