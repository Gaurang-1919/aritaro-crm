import express from "express";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import {
  validateCreateLead,
  validateUpdateLead,
} from "../validators/lead.validator.js";
import validate from "../validators/validate.js";

const router = express.Router();

//every lead route requires the user to be logged in
router.use(verifyJWT);

router
  .route("/")
  .post(validateCreateLead, validate, createLead)
  .get(getAllLeads);

router
  .route("/:id")
  .get(getLeadById)
  .patch(validateUpdateLead, validate, updateLead)
  .delete(authorize("admin"), deleteLead); // only admin can delete a lead

export default router;
