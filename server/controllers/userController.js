import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Hello World!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Unauthorized"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, createdAt, updatedAt, __v, ...rest } = updateUser?._doc;

    const response = {
      success: true,
      statusCode: 200,
      message: "User updated successfully!",
      userData: rest,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Unauthorized"));

  try {
    await User.findByIdAndDelete(req.params.id);

    const response = {
      success: true,
      statusCode: 200,
      message: "User deleted successfully.",
    };

    res.clearCookie("access_token");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
