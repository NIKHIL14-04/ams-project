import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import User from "../models/User.model.js";

export const registerUser = async (payload) => {
  const { name, email, password, role } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid Credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid Credentials", 400);
  }

  return user;
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  return user;
};
