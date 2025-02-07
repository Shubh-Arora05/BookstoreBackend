const jwt = require("jsonwebtoken");
require("dotenv").config();



const generate_token = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: '5h' });
};





const check_token = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).send("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded =>", token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).send("Unauthorized");
  }
};

module.exports = { generate_token, check_token };
