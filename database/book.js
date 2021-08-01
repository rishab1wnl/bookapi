const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    
        ISBN : String,
        title: String,
        authors: [Number],
        language: String,
        pubDate: String,
        numOfPage: Number,
        category: [String],
        publications: Number,
    
});

const Bookmodel = mongoose.model("books", BookSchema);

module.exports = Bookmodel;
