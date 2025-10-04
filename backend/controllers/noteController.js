import { Notes } from "../models/note.js";
import { logger } from "../utils/logger.js";

export const createNote = async (req, res, next) => {
    try {
        const { title, content, color } = req.body;
        const userID = req.user.id;
        if (!title || !content) return res.status(400).json({ message: "Incomplete data", success: false });

        const newNote = await Notes.create({
            title,
            content,
            color,
            user: userID
        })

        res.status(200).json({ message: "Created SuccessFully", success: true })

    } catch (err) {
        logger.error({ err }, "Error in Create Notes Field");
        next(err)
    }
}


export const getNotesByUser = async (req, res, next) => {
    try {
        const userID = req.user.id;
        const getNotes = await Notes.find({ user: userID });
        if (!getNotes || getNotes.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(getNotes);

    } catch (err) {
        logger.error({ err }, "Error in getNotesByUser function");
        next(err);
    }
}


export const deleteNote = async (req, res, next) => {
    try {
        const { noteID } = req.body;
        if (!noteID) {
            return res.status(400).json({ message: "Nothing Selected", success: false });
        }

        const isDelete = await Notes.deleteOne({ _id: noteID });

        if (isDelete.deletedCount >= 1) {
            return res.status(200).json({ message: "Deleted Successfully", success: true });
        }

        res.status(404).json({ message: "Note Not Found or Not Deleted", success: false });
    } catch (err) {
        logger.error({ err }, "Error In deleteNote Function");
        next(err);
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const { title, content, color, noteID } = req.body;

        if (!noteID) {
            return res.status(400).json({ message: "Nothing Selected", success: false });
        }

        const updatedFields = {};

        if (title) updatedFields.title = title;
        if (content) updatedFields.content = content;
        if (color) updatedFields.color = color

        const result = await Notes.updateOne({ _id: noteID }, { $set: updatedFields });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Note not found", success: false });
        }
        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes made", success: true });
        }
        res.status(200).json({ message: "Updated successfully", success: true });

    } catch (err) {
        logger.error({ err }, "Error In updateNote Function");
        next(err);
    }
}