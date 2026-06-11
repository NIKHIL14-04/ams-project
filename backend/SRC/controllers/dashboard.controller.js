import {
  adminDashboardService,
  employeeDashboardService,
} from "../services/dashboard.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const employeeDashboard = asyncHandler(async (req, res) => {
  const dashboard = await employeeDashboardService(req.user._id);

  return sendResponse(res, 200, true, "Dashboard Data", dashboard);
});

export const adminDashboard = asyncHandler(async (req, res) => {
  const data = await adminDashboardService();

  return sendResponse(res, 200, true, "Admin Dashboard", data);
});
