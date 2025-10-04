import express from "express";
import { createNote, deleteNote, getNotesByUser,updateNote } from "../controllers/noteController.js";
import { auth } from "../middlewares/authMiddleWare.js";

export const noteRoutes = express.Router();

noteRoutes.get("/test",(req,res)=>{
    res.status(200).send("NOTE ROUTE WORKING")
})

noteRoutes.post("/create",auth,createNote);
noteRoutes.get("/getNotes",auth,getNotesByUser);
noteRoutes.delete("/delete",auth,deleteNote);
noteRoutes.put("/update",auth,updateNote)