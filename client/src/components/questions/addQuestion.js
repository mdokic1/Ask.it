import React, { Fragment, useState } from "react";
import './addQuestion.css';

const AddQuestion = ({setAuth}) => {
  const [title, setTitle] = useState("");
  const [question_text, setQuestionText] = useState("");

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { title, question_text };
      const response = await fetch("/my-questions/add-question", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

       setTitle("");
       setQuestionText("");
       window.location = "/myquestions";
       
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="col text-center">
        <button
          type="button"
          className="btn btn-add"
          data-toggle="modal"
          data-target="#forma"
        >
          Add question
        </button>
      </div>
      <div className="modal fade" id="forma">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add question</h4>
                        <button 
                            type="button"
                            className="btn close"
                            data-dismiss="modal"
                        >
                        &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            placeholder="title"
                            className="form-control my-3"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="text"
                            className="form-control my-3"
                            value={question_text}
                            onChange={e => setQuestionText(e.target.value)}
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

export default AddQuestion;