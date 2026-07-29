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
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);


router.route("/activities").post(createActivity).get(getAllActivities);
router
  .route("/activities/:id")
  .get(getActivityById)
  .patch(updateActivity)
  .delete(deleteActivity);

//  Notification routes:  at /api/notifications 
router.route("/notifications").post(createNotification).get(getAllNotifications);
router
  .route("/notifications/:id")
  .get(getNotificationById)
  .patch(updateNotification)
  .delete(deleteNotification);

export default router;
