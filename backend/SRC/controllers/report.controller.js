import { dailyReportService } from "../services/report.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const dailyReport = asyncHandler(async (req, res) => {
  const report = await dailyReportService();

  return sendResponse(res, 200, true, "Daily Report", report);
});
