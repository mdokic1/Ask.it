import React, { Fragment, useState } from "react";

const AddAnswer = ({onAdd, question_id}) => {
  const [answer_text, setAnswerText] = useState("");

  const onSubmitForm = (e) => {
    //e.preventDefault();
    onAdd(answer_text, question_id);
  };
  return (
    // <Fragment>
      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <label htmlFor="answer" className="form-label">Enter your answer</label>
          <input onChange={e => setAnswerText(e.target.value)} className="form-control" id="answer"></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
};

export default AddAnswer;