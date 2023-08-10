import mongoose from "mongoose";

const book = new mongoose.model('Book',{
    title: {type:String, default:""},
    author: {type:String, default:""},
    description: {type:String, default:""},
    price: {type:Number, default:0},
    type: {type:String, default:""},
});


export default book;