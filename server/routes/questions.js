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

// add question
router.post("/add-question", authorization, async (req, res) => {
  try {
    //console.log(req.body);
    const {title, question_text} = req.body;
    const newQuestion = await pool.query(
      "INSERT INTO questions (title, question_text, likes, dislikes, user_id) VALUES ($2, $3, 0, 0, $1) RETURNING *",
      [req.user, title, question_text]
    );

    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete question
router.delete("/delete-question/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuestion = await pool.query(
      "DELETE FROM questions WHERE question_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    if (deleteQuestion.rows.length === 0) {
      return res.json("This question is not yours");
    }

    res.json("Question was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;