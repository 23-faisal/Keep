import { Router } from "express";
import { addNote } from "../controllers/notes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const notesRouter = Router();

notesRouter.post("/add-note", authMiddleware, addNote);

export default notesRouter;
