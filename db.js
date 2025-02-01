const mongoose = require("mongoose");
require("dotenv").config();
const mongoose_url = process.env.mongoose_url;
console.log(mongoose_url);
mongoose.connect(
  "mongodb+srv://2k22csds2213052:shubharora@cluster0.ooww8.mongodb.net/",
  {
    // useNewUrlParser: true ,
    // useUnifiedTopology: true ,
  }
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("error in connecting to database");
});

db.on("connected", () => {
  console.log("connected to database");
});

db.on("disconnected", () => {
  console.log("disconnected to database");
});

module.exports = db;
