const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// add answer to question with given id
router.post("/add-answer/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      //console.log(req.body);
      const {answer_text} = req.body;
      const newAnswer = await pool.query(
        "INSERT INTO answers (answer_text, likes, dislikes, user_id, question_id) VALUES ($1, 0, 0, $2, $3) RETURNING *",
        [answer_text, req.user, id]
      );
  
      res.json(newAnswer.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

module.exports = router;