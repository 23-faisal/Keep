import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found ." });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token." });
  }
};

export default authMiddleware;
