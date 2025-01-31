const express = require("express");
const routes = express.Router();
const Book = require("../models/book");

routes.get("/", async (req, res) => {
  try {
    const data = await Book.find({});
    res.status(200).json({
      count: data.length,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findById(id);
    res.status(200).json({
      count: data.length,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

routes.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.author || !data.year) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    
    const t = data.name ;
    const check = await Book.findOne({name : t}) ;
    if (check) {
       return res.status(200).send('Name of already exit'); 
    }
    const newBook = new Book(data);
    const response = await newBook.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log( "id : " ,id) ;
    console.log( "id : " ,id) ;
    const data = req.body;
    const response = await Book.findByIdAndUpdate(id, data ,{
        new: true
    });
    if (!response) {
       return res.status(404).send({ message: "Id not Found" });
    }
    res.status(200).send(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log( "id : " ,id) ;
    console.log( "id : " ,id) ;
    const response = await Book.findByIdAndDelete(id);
    if (!response) {
      res.status(404).send({ message: "Id not Found" });
    }
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = routes;
