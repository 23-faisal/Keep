import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
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
    res.status(200).json({
      success: true,
      message: "Sign in api is working perfectly!",
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
