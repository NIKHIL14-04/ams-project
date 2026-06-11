import User from "../models/User.model.js";
export const getAllUsersService = async () => {
  const users = await User.find().select("-password").sort({
    createdAt: -1,
  });

  return users;
};
