import React, { Fragment, useState } from "react";

const AddAnswer = ({setAuth}, question_id) => {
  const [answer_text, setAnswerText] = useState("");

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { answer_text };
      const response = await fetch(`http://localhost:5000/answers/add-answer${question_id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

    //   setQuestionsChange(true);
       //setTitle("");
       setAnswerText("");
       window.location = "/questions";
       
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="col text-center">
        {/* <button
          type="button"
          className="btn btn-add"
          data-toggle="modal"
          data-target="#forma"
        >
          Add question
        </button> */}
      </div>
      <br></br>
      <div className="modal fade" id="forma">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add answer</h4>
                        <button 
                            type="button"
                            className="btn close"
                            data-dismiss="modal"
                            // onClick={() => setDescription(todo.description)}
                        >
                        &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            placeholder="text"
                            className="form-control my-3"
                            value={answer_text}
                            onChange={e => setAnswerText(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={(e) => onSubmitForm(e)}
                            >
                            Add
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            // onClick={() => setDescription(todo.description)}
                            >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
};

export default AddAnswer;