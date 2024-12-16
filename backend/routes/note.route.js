import { Router } from "express";
import {
  addNote,
  editNote,
  getAllNotes,
} from "../controllers/notes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const notesRouter = Router();

notesRouter.post("/add-note", authMiddleware, addNote);

notesRouter.put("/edit-note/:noteId", authMiddleware, editNote);

notesRouter.get("/all-notes", authMiddleware, getAllNotes);

export default notesRouter;
