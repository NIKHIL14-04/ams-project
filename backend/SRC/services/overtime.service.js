import Attendance from "../models/Attendance.js";
import Overtime from "../models/Overtime.js";
import AppError from "../utils/AppError.js";

export const requestOTService = async (userId, attendanceId, reason) => {
  if (!attendanceId || !reason) {
    throw new AppError("Attendance Id and Reason Required", 400);
  }
  const attendance = await Attendance.findById(attendanceId);

  if (!attendance) {
    throw new AppError("Attendance Not Found", 404);
  }
  const overtime = await Overtime.create({
    userId,
    attendanceId,
    reason,
  });

  return overtime;
};

export const getPendingOTService = async () => {
  const requests = await Overtime.find({
    status: "pending",
  })
    .populate("userId", "name email")
    .populate("attendanceId");

  return requests;
};

export const approveOTService = async (overtimeId, approvedBy) => {
  const overtime = await Overtime.findById(overtimeId);
  if (!overtime) {
    throw new AppError("Request Not Found", 404);
  }

  overtime.status = "approved";
  overtime.approvedBy = approvedBy;
  await overtime.save();
  return overtime;
};
