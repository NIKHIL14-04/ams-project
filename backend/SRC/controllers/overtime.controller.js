import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

import {
    approveOTService,
  getPendingOTService,
  requestOTService,
} from "../services/overtime.service.js";

export const requestOT = asyncHandler(async (req, res) => {
  const { attendanceId, reason } = req.body;

  const overtime = await requestOTService(req.user._id, attendanceId, reason);

  return sendResponse(res, 201, true, "Overtime Request Submitted", overtime);
});

export const getPendingOT = asyncHandler(async (req, res) => {
  const requests = await getPendingOTService();
  return sendResponse(res, 200, true, "Pending Requests", requests);
});

export const approveOT = asyncHandler(async (req, res) => {
  const overtime = await approveOTService(req.params.id, req.user._id);

  return sendResponse(res, 200, true, "OT Approved", overtime);
});
