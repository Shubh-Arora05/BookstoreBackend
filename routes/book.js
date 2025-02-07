const express = require("express");
const routes = express.Router();
const Book = require("../models/book");
const auth = require('./../jwt.js') ;
const check_token = auth.check_token ;

routes.get("/", check_token, async (req, res) => {
  try {
    const data = await Book.find({});
    return res.status(200).json({
      count: data.length,
      data: data,
    });
  } catch (err) {
    // console.log(err);
   return res.status(500).send(err);
  }
});

routes.get("/:id", check_token, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findById(id);
    return res.status(200).json({
      data: data
    });
  } catch (err) {
    // console.log(err);
    return res.status(500).send(err);
  }
});

routes.post("/", check_token ,async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.author || !data.year) {
      return res.status(404).send({ message: "Please fill all the fields" });
    }
    const t = data.name ;
    const check = await Book.findOne({name : t}) ;
    if (check) {
       return res.status(404).send('Name of Book already exit'); 
    }
    const newBook = new Book(data);
    const response = await newBook.save();
    return res.status(200).send(response);
  } catch (err) {
    // console.log(err);
    return res.status(500).send(err);
  }
});

routes.put("/:id",  check_token ,async (req, res) => {
  try {
    const id = req.params.id;
    // console.log( "id : " ,id) ;
    // console.log( "id : " ,id) ;
    const data = req.body;
    const response = await Book.findByIdAndUpdate(id, data ,{
        new: true
    });
    if (!response) {
       return res.status(404).send({ message: "Id not Found" });
    }
    return res.status(200).send(response);
  } catch (err) {
    // console.log(err.message);
    return res.status(500).send(err.message);
  }
});

routes.delete("/:id",  check_token ,async (req, res) => {
  try {
    const id = req.params.id;
    // console.log( "id : " ,id) ;
    // console.log( "id : " ,id) ;
    const response = await Book.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send({ message: "Id not Found" });
    }
    return res.status(200).send(response);
  } catch (err) {
    // console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = routes;
