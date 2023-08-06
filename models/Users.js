import mongoose from "mongoose";

const user = new mongoose.model('User',{
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    secret: String,
    age: Number,
    phone: String,
    type: String,
});

module.exports = user;