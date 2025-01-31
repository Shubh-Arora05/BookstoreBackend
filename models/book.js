const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true ,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  }
},
  {
    timestamps: true
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
