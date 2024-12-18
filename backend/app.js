import express from "express";
import cors from "cors";
import errorHandler from "./utils/error.js";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";
import notesRouter from "./routes/note.route.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/auth.middleware.js";
import User from "./models/user.model.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-csrf-token",
      "Set-Cookie",
    ],

    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is working!",
    });
  } catch (error) {
    next(error);
  }
});

// get the user
app.use("/get-user", authMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Couldn't find the user`,
      });
    }

    res.status(200).json({
      success: true,
      message: `User data fetched successfully!`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(errorHandler(error));
  }
});

// authentication router

app.use("/api/auth", authRouter);

// notes related route

app.use("/notes", notesRouter);

// 404 Middleware
app.use((req, res, next) => {
  const error = errorHandler(404, "Resource not found");
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export default app;
