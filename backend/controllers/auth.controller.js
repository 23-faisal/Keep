import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const singUpController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "All the field must be filled!",
      });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(404).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userResponse = {
      email: newUser.email,
      username: newUser.username,
    };

    res.status(200).json({
      success: true,
      message: "Sign up successful!",
      user: userResponse,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All the field must be filled!",
      });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: `User does n't exists!`,
      });
    }

    const passwordMatched = await bcrypt.compare(password, userExists.password);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid  password",
      });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Only send cookie over HTTPS in production
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: `${userExists.username} signed in successfully!`,
        user: {
          email: userExists.email,
          username: userExists.username,
        },
        token,
      });
  } catch (error) {
    next(errorHandler(error));
  }
};
