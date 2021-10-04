const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());  //req.body
app.use(cors());

//routes


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});