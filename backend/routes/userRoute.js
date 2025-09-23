import express from "express";

export const userRoutes = express.Router();

userRoutes.get("/test",(req,res)=>{
    res.status(200).send("USER ROUTE WORKING")
})