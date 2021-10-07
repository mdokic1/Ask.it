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

// get answers of a question with given id
router.get("/all-answers/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const answers = await pool.query(
      "SELECT * FROM answers WHERE question_id=$1",
      [id]
    );

    res.json(answers.rows);
    //console.log(answers.rows);
    //res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//add like
router.put("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateAnswer = await pool.query(
      "UPDATE answers SET likes = likes + 1 WHERE answer_id = $1 RETURNING *",
      [id]
    );

    // if (updateQuestion.rows.length === 0) {
    //   return res.json("This todo is not yours");
    // }

    res.json("Answer was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//add dislike
router.put("/dislike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateAnswer = await pool.query(
      "UPDATE answers SET dislikes = dislikes + 1 WHERE answer_id = $1 RETURNING *",
      [id]
    );

    // if (updateQuestion.rows.length === 0) {
    //   return res.json("This todo is not yours");
    // }

    res.json("Answer was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//edit answer
router.put("/edit/:id", async (req, res) => {
  try {
    const {answer_text} = req.body;
    const { id } = req.params;
    const updateAnswer = await pool.query(
      "UPDATE answers SET answer_text = $2 WHERE answer_id = $1 RETURNING *",
      [id, answer_text]
    );

    res.json("Answer was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete answer
router.delete("/delete/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAnswer = await pool.query(
      "DELETE FROM answers WHERE answer_id = $1 RETURNING *",
      [id]
    );

    res.json("Answer was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;