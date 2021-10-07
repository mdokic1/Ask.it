const router = require("express").Router();
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

  
module.exports = router;