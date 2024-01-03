import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    const {
      password: pass,
      createdAt,
      updatedAt,
      __v,
      ...rest
    } = newUser?._doc;
    const response = {
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      userData: rest,
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const {
      password: pass,
      createdAt,
      updatedAt,
      __v,
      ...rest
    } = validUser?._doc;
    const response = {
      success: true,
      statusCode: 200,
      message: "Login successfully",
      userData: rest,
    };
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(response);
    res.status(200).json("Logged in successfully!");
  } catch (error) {
    next(error);
  }
};
