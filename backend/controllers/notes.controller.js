import errorHandler from "../utils/error.js";
import Notes from "../models/note.model.js";

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
