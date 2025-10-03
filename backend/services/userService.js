import { User } from "../models/user.js";

export const findUserByEmail = async (email)=>{
   const response = await User.findOne({email});
   if(!response) return null;
   return response;
}