import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/userRoute.js";
import { noteRoutes } from "./routes/noteRoute.js";
import { mongoConnection } from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


await mongoConnection;

app.use("/api/user",userRoutes);
app.use("/api/note",noteRoutes)

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server Started At Port : ${port}`);
})