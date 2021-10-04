const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// get my questions
router.get("/", authorization, async (req, res) => {
  try {
    const questions = await pool.query(
      "SELECT * FROM questions WHERE user_id = $1",
      [req.user]
    );

    res.json(questions.rows);
    //res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;