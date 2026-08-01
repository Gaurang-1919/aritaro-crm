import api from "./axios";

export const getOverview = () =>
  api.get("/dashboard/overview");

export const getKanbanSummary = () =>
  api.get("/dashboard/kanban-summary");

export const getLeadSourceAnalytics = () =>
  api.get("/dashboard/lead-source-analytics");

export const getSetterMetrics = () =>
  api.get("/dashboard/setter-metrics");

export const getCloserMetrics = () =>
  api.get("/dashboard/closer-metrics");

export const getRevenueProjection = () =>
  api.get("/dashboard/revenue-projection");

export const getMoneyMetrics = () =>
  api.get("/dashboard/money-metrics");

export const getRecentActivities = () =>
  api.get("/dashboard/recent-activities");