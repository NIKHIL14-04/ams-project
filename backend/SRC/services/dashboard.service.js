import Attendance from "../models/Attendance.js";
import Overtime from "../models/Overtime.js";
import User from "../models/User.model.js";

export const employeeDashboardService = async (userId) => {
  const attendanceCount = await Attendance.countDocuments({
    userId,
  });

  const completedDays = await Attendance.countDocuments({
    userId,
    status: "completed",
  });

  const pendingOT = await Overtime.countDocuments({
    userId,
    status: "pending",
  });

  return {
    attendanceCount,
    completedDays,
    pendingOT,
  };
};

export const adminDashboardService = async () => {
  const totalUsers = await User.countDocuments();

  const totalAttendance = await Attendance.countDocuments();

  const pendingValidation = await Attendance.countDocuments({
    validationStatus: "pending",
  });

  const pendingOT = await Overtime.countDocuments({
    status: "pending",
  });

  return {
    totalUsers,
    totalAttendance,
    pendingValidation,
    pendingOT,
  };
};
