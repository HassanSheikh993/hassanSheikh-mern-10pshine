import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";

export const userRoutes = express.Router();

userRoutes.get("/test",(req,res)=>{
    res.status(200).send("USER ROUTE WORKING")
})

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser)
userRoutes.post("/logout",logoutUser)
