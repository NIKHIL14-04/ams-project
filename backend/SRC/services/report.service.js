import Attendance from "../models/Attendance.js";
export const dailyReportService = async () => {
  const report = await Attendance.find().populate("userId", "name email");

  return report;
};
