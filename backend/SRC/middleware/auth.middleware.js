import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.model.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Access Token Required", 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new AppError("User Not Found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new AppError("Invalid Token", 401));
  }
};

export default auth;
