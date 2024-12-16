import { Router } from "express";
import { addNote, editNote } from "../controllers/notes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const notesRouter = Router();

notesRouter.post("/add-note", authMiddleware, addNote);

notesRouter.put("/edit-note/:noteId", authMiddleware, editNote);

export default notesRouter;
