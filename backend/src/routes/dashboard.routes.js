import express from "express";
import {
  getDashboardOverview,
  getKanbanSummary,
  getLeadSourceAnalytics,
  getSetterMetrics,
  getRecentSetterActivity,
  getCloserMetrics,
  getCloserRevenueBreakdown,
  getMoneyMetrics,
  getRevenueProjection,
  getLeakReport,
  getRecentActivities,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/overview", getDashboardOverview);
router.get("/kanban-summary", getKanbanSummary);
router.get("/lead-source-analytics", getLeadSourceAnalytics);
router.get("/setter-metrics", getSetterMetrics);
router.get("/setter-activity", getRecentSetterActivity);
router.get("/closer-metrics", getCloserMetrics);
router.get("/closer-revenue-breakdown", getCloserRevenueBreakdown);
router.get("/money-metrics", getMoneyMetrics);
router.get("/revenue-projection", getRevenueProjection);
router.get("/alerts", getLeakReport);
router.get("/recent-activities", getRecentActivities);

export default router;
