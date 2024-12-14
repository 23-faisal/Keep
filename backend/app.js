import express from "express";
import cors from "cors";
import errorHandler from "./utils/error.js";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";
import notesRouter from "./routes/note.route.js";
import cookieParser from "cookie-parser";

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
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
