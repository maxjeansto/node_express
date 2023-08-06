import mongoose from "mongoose";

const book = new mongoose.model('Book',{
    id: Number,
    title: String,
    author: String,
    description: String,
    price: Number,
    type: String,
});

module.exports = book;