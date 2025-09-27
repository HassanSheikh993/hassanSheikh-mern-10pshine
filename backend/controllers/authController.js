import { generateToken } from "../config/generateToken.js";
import { User } from "../models/user.js";
import { findUserByEmail } from "../services/userService.js";
import { logger } from "../utils/logger.js";

export const registerUser = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password) return res.status(400).json({message:"Incomplete data"});

        const userExist = await findUserByEmail(email);
        if(userExist) return res.status(400).json({message:"User Exists With This Email"});

        const newUser = await User.create({
            name:name,
            email:email,
            password:password
        })

        res.status(201).json({message:"Account Created",user:newUser})
    }catch(err){
    logger.error({ err }, "Error in registerUser function");
        next(err);
    }
}


export const loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message:"Incomplete Data",success:false});
        const userExist = await findUserByEmail(email);
        if(!userExist) return res.status(404).json({message:"User Not Exist",success:false})

        const isMatch = await userExist.matchPassword(password);
        if(!isMatch) return res.status(401).json({message:"Incorrect Password",success: false});    
        
        const token = generateToken(userExist._id);
  res.cookie("token", token, {
  httpOnly: true,
  secure: false, 
  sameSite: "lax", 
  maxAge: 30 * 24 * 60 * 60 * 1000, 
});


        res.json({ success: true, message: "Login successful",userEmail:userExist.email});


    }catch(err){
        logger.error({ err }, "Error in loginUser function");
        next(err);
    }
}



export const logoutUser = (req,res,next)=>{
 try{
    res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully', status: true });
 }catch(err){
logger.error({ err }, "Error in logoutUser function");
next(err)
 }
}