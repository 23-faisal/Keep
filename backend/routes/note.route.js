import { Router } from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNotes,
  updatePinnedValue,
} from "../controllers/notes.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const notesRouter = Router();

// add note
notesRouter.post("/add-note", authMiddleware, addNote);

// edit note
notesRouter.put("/edit-note/:noteId", authMiddleware, editNote);

// get all the notes
notesRouter.get("/all-notes", authMiddleware, getAllNotes);

// delete a note
notesRouter.delete("/delete-note/:noteId", authMiddleware, deleteNote);

// update pinned value of a note
notesRouter.put(
  "/update-note-pinned/:noteId",
  authMiddleware,
  updatePinnedValue
);

notesRouter.get("/search-notes", authMiddleware, searchNotes);

export default notesRouter;
