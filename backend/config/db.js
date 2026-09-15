import mongoose from "mongoose";
import dotenv from "dotenv"
import { logger } from "../utils/logger.js";
dotenv.config();

export const mongoConnection = mongoose.connect(process.env.MONGO_URL)
.then(()=>logger.info("Connected with DataBase"))
.catch((err)=>logger.error({err},"Error while connecting with Data Base"))