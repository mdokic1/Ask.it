const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if(!jwtToken) {
      console.log("Greska");
      return res.json("Not authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();

  } catch (err) {
    console.error(err.message);
    return res.json("Not authorized");
  }
};