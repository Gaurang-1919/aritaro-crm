import express from "express";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// every lead route requires the user to be logged in
router.use(verifyJWT);

router.route("/").post(createLead).get(getAllLeads);

router
  .route("/:id")
  .get(getLeadById)
  .patch(updateLead)
  .delete(authorize("admin"), deleteLead); // only admin can delete a lead

export default router;
