const router = require("express").Router()
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

//register
router.post("/register", validInfo, async (req, res) => {
    try {
      const {firstname, lastname, email, password} = req.body; 
       
      const user = await pool.query("SELECT * FROM users WHERE firstname = $1 AND lastname = $2 AND email = $3",
      [firstname, lastname, email]);

       //res.json(user.rows);

      if (user.rows.length !== 0){
          return res.status(401).send("User already exists");
      }
       
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
        // const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query("INSERT INTO users (firstname, lastname, email, user_password, answers) VALUES ($1, $2, $3, $4, 0) RETURNING *",
      [firstname, lastname, email, bcryptPassword]);

        // const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        // return res.json({ jwtToken });
      //res.json(newUser.rows[0]);

      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login
router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Password or email is incorrect");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );

      //console.log(validPassword);
  
      if (!validPassword) {
        return res.status(401).json("Password or email is incorrect");
      }
     
      const token = jwtGenerator(user.rows[0].user_id);
      // return res.json({ jwtToken });
      res.json({token});
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

router.get("/is-verified", authorization, async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;