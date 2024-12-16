import errorHandler from "../utils/error.js";
import Notes from "../models/note.model.js";
import Note from "../models/note.model.js";

// add note

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

// edit note

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

// get all the note s

export const getAllNotes = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const notes = await Notes.find({ userId: _id }).sort({ isPinned: -1 });

    if (!notes) {
      return res.status(400).json({
        success: false,
        message: "No notes found!",
      });
    }

    res.status(200).json({
      success: true,
      notes,
      message: "All notes retreived successfully",
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

// delete a note

export const deleteNote = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;

    const note = await Note.findOne({
      _id: noteId,
      userId: _id,
    });

    if (!note) {
      return res.status(400).json({
        success: false,
        message: "Note not found!",
      });
    }

    await Note.deleteOne({
      _id: noteId,
      userId: _id,
    });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

// update pinned value of a note

export const updatePinnedValue = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { _id } = req.user;

    const note = await Note.findOne({
      _id: noteId,
      userId: _id,
    });

    if (!note) {
      return res.status(400).json({
        success: false,
        message: "Note not found",
      });
    }

    // Toggle the isPinned value
    note.isPinned = !note.isPinned;

    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isPinned ? "pinned" : "unpinned"} successfully`,
      note,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
