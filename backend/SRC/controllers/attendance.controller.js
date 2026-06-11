import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import {
  getAllAttendanceService,
  getMyAttendanceService,
  punchInService,
  punchOutService,
  validateAttendanceService,
} from "../services/attendance.service.js";

export const punchIn = asyncHandler(async (req, res) => {
  const attendance = await punchInService(req.user._id, req.body);
  return sendResponse(res, 201, true, "Punch In Successful", attendance);
});

export const punchOut = asyncHandler(async (req, res) => {
  const attendance = await punchOutService(req.user._id);
  return sendResponse(res, 200, true, "Punch Out Successful", attendance);
});

export const getMyAttendance = asyncHandler(async (req, res) => {
  const attendances = await getMyAttendanceService(req.user._id);
  return sendResponse(
    res,
    200,
    true,
    "Attendance Fetched Successfully",
    attendances,
  );
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const attendances = await getAllAttendanceService();
  return sendResponse(res, 200, true, "Attendance Fetched", attendances);
});

export const validateAttendance = asyncHandler(async (req, res) => {
  const { validationStatus, remarks } = req.body;

  const attendance = await validateAttendanceService(
    req.params.attendanceId,
    validationStatus,
    remarks,
  );

  return sendResponse(res, 200, true, "Attendance Verified", attendance);
});
