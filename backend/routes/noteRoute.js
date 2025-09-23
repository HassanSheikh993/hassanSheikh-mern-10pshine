import express from "express";

export const noteRoutes = express.Router();

noteRoutes.get("/test",(req,res)=>{
    res.status(200).send("NOTE ROUTE WORKING")
})