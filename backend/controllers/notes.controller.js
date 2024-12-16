import errorHandler from "../utils/error.js";
import Notes from "../models/note.model.js";
import Note from "../models/note.model.js";

export const addNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title) {
      return res.status(401).json({
        success: false,
        message: "Title is required!",
      });
    }

    if (!content) {
      return res.status(401).json({
        success: false,
        message: "Content is required!",
      });
    }

    const newNote = new Notes({
      title,
      content,
      tags: tags || [],
      userId: req.user._id,
    });

    await newNote.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully!",
      note: newNote,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { _id } = req.user;

    if (!title && !content && !tags) {
      return res.status(400).json({
        success: false,
        message: "No changes provided!",
      });
    }

    const note = await Note.findOne({ _id: noteId, userId: _id });

    if (!note) {
      return res.status(400).json({
        success: false,
        message: "Note not found!",
      });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    res.status(200).json({
      success: false,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
