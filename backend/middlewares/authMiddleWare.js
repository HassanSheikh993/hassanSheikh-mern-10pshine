import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv"
import { logger } from "../utils/logger.js";

dotenv.config();

export const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        logger.info({ token }, "Auth Token");

        if(!token){
            logger.error("Access Denied. Need to login");
            return res.status(401).json({message:"Access Denied. Need to login"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const validUser = await User.findOne({_id:decode.id});

        logger.info({validUser}, "validUser");

        if(!validUser){
            return res.status(404).json({message:"user not found"})
        }
        
    req.user = decode;
    next()

    }catch(err){
        logger.error({err},"Error in auth Function");
        next(err);
    }
}