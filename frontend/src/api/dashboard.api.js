import api from "./axios";

export const getDashboardOverview = () =>
    api.get("/dashboard/overview");

export const getRecentActivities = () =>
    api.get("/dashboard/recent-activities");

export const getMoneyMetrics = () =>
    api.get("/dashboard/money-metrics");

export const getRevenueProjection = () =>
    api.get("/dashboard/revenue-projection");

export const getKanbanSummary = () =>
    api.get("/dashboard/kanban-summary");