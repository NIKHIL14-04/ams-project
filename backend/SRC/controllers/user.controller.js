import { getAllUsersService } from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  return sendResponse(res, 200, true, "Users fetched successfully", users);
});
