import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    color:{type:String,default:"white"},
    user:{type: mongoose.Schema.Types.ObjectId,ref:"user"}
},{timestamps: true})


export const Notes = mongoose.model("notes",noteSchema)