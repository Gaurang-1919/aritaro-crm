import express from "express";

import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller.js";

import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import {
  validateCreateActivity,
  validateUpdateActivity,
} from "../validators/activity.validators.js";

import {
  validateCreateNotification,
  validateUpdateNotification,
} from "../validators/notification.validators.js";

import validate from "../validators/validate.js";

const router = express.Router();

router.use(verifyJWT);

// Activities

router
  .route("/activities")
  .post(
    validateCreateActivity,
    validate,
    createActivity
  )
  .get(getAllActivities);

router
  .route("/activities/:id")
  .get(getActivityById)
  .patch(
    validateUpdateActivity,
    validate,
    updateActivity
  )
  .delete(authorize("admin"), deleteActivity);

// Notifications

router
  .route("/notifications")
  .post(
    validateCreateNotification,
    validate,
    createNotification
  )
  .get(getAllNotifications);

router
  .route("/notifications/:id")
  .get(getNotificationById)
  .patch(
    validateUpdateNotification,
    validate,
    updateNotification
  )
  .delete(authorize("admin"), deleteNotification);

export default router;