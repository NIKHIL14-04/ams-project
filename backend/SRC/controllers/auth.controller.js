import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import generateToken from "../utils/generateToken.js";
import { getProfile, loginUser, registerUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  return sendResponse(res, 201, true, "User Registered Successfully", user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const token = generateToken(user);
  return sendResponse(res, 200, true, "Login Successful", {
    token,user
  });
});

export const profile = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user._id);
  return sendResponse(res, 200, true, "Profile Fetched", user);
});
