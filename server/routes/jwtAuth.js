const router = require("express").Router()
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//register
router.post("/register", validInfo, async (req, res) => {
    try {
       const {firstname, lastname, email, user_password} = req.body; 
       
       const user = await pool.query("SELECT * FROM users WHERE firstname = $1 AND lastname = $2 AND email = $3 AND user_password = $4",
       [firstname, lastname, email, user_password]);

       if (user.rows.length > 0){
           return res.status(401).send("User already exists");
       }
       
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(user_password, salt);

        let newUser = await pool.query("INSERT INTO users (firstname, lastname, email, user_password, answers) VALUES ($1, $2, $3, $4, 0) RETURNING *",
        [firstname, lastname, email, bcryptPassword]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken });
    

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login
router.post("/login", validInfo, async (req, res) => {
    const { email, user_password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1 AND user_password = $2", [
        email, user_password
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid credentials");
      }
  
      const validPassword = await bcrypt.compare(
        user_password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid credentials");
      }
     
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

router.post("/is-verified", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;