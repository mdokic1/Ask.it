const router = require("express").Router();
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const pool = require("../db");

// get user by id
router.get("/user/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
      [id]
      );
      
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

// get logged in user
router.get("/user-logged", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
    [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit user
router.put("/edit/:id", async (req, res) => {
  try {
    const {name, surname, email} = req.body;
    const { id } = req.params;
    const updateUser = await pool.query(
      "UPDATE users SET firstname = $2, lastname = $3, email = $4 WHERE user_id = $1 RETURNING *",
      [id, name, surname, email]
    );

    res.json("User was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//edit password
router.put("/edit-pass/:id", async (req, res) => {
  try {
    const {newPassword} = req.body;
    const { id } = req.params;
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptNewPassword = await bcrypt.hash(newPassword, salt);
    const updateUser = await pool.query(
      "UPDATE users SET user_password = $2 WHERE user_id = $1 RETURNING *",
      [id, bcryptNewPassword]
    );
      
    res.json("Password was updated");
        // const salt = await bcrypt.genSalt(10);
    // const bcryptCurrPassword = await bcrypt.hash(currPassword, salt);
    // console.log("Sifra current " + bcryptCurrPassword);
    // const getUser = await pool.query("SELECT * FROM users WHERE user_password = $1 AND user_id = $2",
    // [bcryptCurrPassword, id]
    // );

    // if(getUser.rows.length === 0){
    //   res.json("Incorrect password");
    // }
    

  } catch (err) {
    console.error(err.message);
  }
});

  
module.exports = router;