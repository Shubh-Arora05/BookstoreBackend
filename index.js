const cors = require("cors");
const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config() ;
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

const person_routes = require("./routes/person");
const book_routes = require("./routes/book");

app.use("/person", person_routes);
app.use("/book", book_routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
