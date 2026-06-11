import Attendance from "../models/Attendance.js";
import AppError from "../utils/AppError.js";

export const punchInService = async (userId, payload) => {
  const { selfie, latitude, longitude } = payload;
  if (!selfie || !latitude || !longitude) {
    throw new AppError("Selfie and Location Required", 400);
  }
  const todayAttendance = await Attendance.findOne({
    userId,
    punchOutTime: null,
  });
  if (todayAttendance) {
    throw new AppError("Already Punched In", 400);
  }

  const attendance = await Attendance.create({
    userId,
    selfie,

    location: {
      latitude,
      longitude,
    },

    punchInTime: new Date(),
  });

  return attendance;
};

export const punchOutService = async (userId) => {
  const attendance = await Attendance.findOne({
    userId,
    punchOutTime: null,
  });

  if (!attendance) {
    throw new AppError("No Active Punch In Found", 404);
  }

  const punchOutTime = new Date();

  attendance.punchOutTime = punchOutTime;

  const totalHours = (punchOutTime - attendance.punchInTime) / (1000 * 60 * 60);

  attendance.totalHours = Number(totalHours.toFixed(2));

  attendance.status = totalHours >= 8 ? "completed" : "incomplete";

  await attendance.save();

  return attendance;
};

export const getMyAttendanceService = async (userId) => {
  const attendances = await Attendance.find({
    userId,
  }).sort({
    createdAt: -1,
  });
  return attendances;
};

export const getAllAttendanceService = async () => {
  const attendances = await Attendance.find()
    .populate("userId", "name email role")
    .sort({
      createdAt: -1,
    });

  return attendances;
};

export const validateAttendanceService = async (
  attendanceId,
  validationStatus,
  remarks,
) => {
  const attendance = await Attendance.findById(attendanceId);
  if (!attendance) {
    throw new AppError("Attendance Not Found", 404);
  }
  attendance.validationStatus = validationStatus;
  attendance.remarks = remarks;
  await attendance.save();
  return attendance;
};
