import sendResponse from "../utils/sendResponse.js";

const errorMiddleware = (err, req, res, next) => {
  return sendResponse(
    res,
    err.statusCode || 500,
    false,
    err.message || "Server Error",
  );
};

export default errorMiddleware;
