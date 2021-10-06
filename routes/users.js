const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// get user by id
router.get("/user/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query(
        "SELECT * FROM users WHERE user_id = $1 RETURNING *",
        [id]
      );
  
    //   if (deleteQuestion.rows.length === 0) {
    //     return res.json("This question is not yours");
    //   }
  
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
module.exports = router;