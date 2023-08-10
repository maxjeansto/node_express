import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {type:String, default:""},
    lastName: {type:String, default:""},
    email: {type:String, required:false},
    secret: {type:String, required:true},
    age: {type:Number, default:0},
    phone: {type:String, default:""},
    type: {type:String, default:""},});

export const user = mongoose.model('User', userSchema, 'Users');

export default user;
