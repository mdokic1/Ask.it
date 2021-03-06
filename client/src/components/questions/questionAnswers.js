import React, {Fragment, useState, useEffect} from "react";
import './questionAnswers.css';
import {useParams} from "react-router-dom";

const QuestionAnswers = (props) => {
    const {id, check} = useParams()
    console.log("IDDD" + id);
    console.log("check " + check);
    const [answers, setAnswers] = useState([]);  // prazan niz
    const [answer_text, setAnswerText] = useState("");
    const [selectedID, setSelectedID] = useState(0);
    const [loggedIn, setLoggedIn] = useState([]);

    async function findLoggedUser(){
       
        try {
            const response = await fetch(`/users/user-logged`, {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setLoggedIn(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    
    }
  

    async function getAnswers(){
        try {
            const response = await fetch(`/answers/all-answers/${id}`, {
                method: "GET",
                // headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            parseRes.sort((a,b) => (a.answer_date > b.answer_date) ? -1 : ((b.answer_date > a.answer_date) ? 1 : 0))
            
            setAnswers(parseRes);

            if(check == "true"){
                findLoggedUser();
            }


        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteAnswer(e, id) {
        e.preventDefault();

        try {
          await fetch(`/answers/delete/${id}`, {
            method: "DELETE",
            headers: { token: localStorage.token }
          });
    
          setAnswers(answers.filter(answer => answer.answer_id !== id));
        } catch (err) {
          console.error(err.message);
        }
    }

    const getDate = (date) => {
        var dat = new Date(date);
        return dat.toDateString() + ", " + (dat.getHours()<10?'0':'') + dat.getHours() + ":" + (dat.getMinutes()<10?'0':'') + dat.getMinutes();
    }

    const selectID = (e, id, answerText) =>{
        e.preventDefault();
        setSelectedID(id);
        setAnswerText(answerText);
    }


    async function addLike(e, answer){
        e.preventDefault();
        try {
            const response = await fetch(`/answers/like/${answer}`, {
            method: "PUT",
            // headers: {token: localStorage.token}

        });

        getAnswers();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function addDislike(e, answer){
        e.preventDefault();
        try {
            const response = await fetch(`/answers/dislike/${answer}`, {
            method: "PUT",
            // headers: {token: localStorage.token}

        });

        getAnswers();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function editAnswer(e, answerID){
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { answer_text };
            const response = await fetch(`/answers/edit/${answerID}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            getAnswers();
            setAnswerText("");

        } catch (err) {
            console.error(err.message);
        }
    }

    const checkID = (id) => {
        if(check){
            return id === loggedIn.user_id;
        }
        return false;
    }

    useEffect(() => {
        getAnswers();
    }, [])

    return (
        <Fragment>
            <br/>
            <h3>Answers</h3>
            <div className="list-group answers-list">
                {
                    answers.map(a => 
                        <div key={a.answer_id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <h5></h5>
                                <div className="ms-2 c-details">
                                    <small className="mb-0">{getDate(a.answer_date)}</small>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="heading">{a.answer_text}</p>
                                <div className="mt-3 d-flex justify-content-between">
                                    <div className="btn-toolbar">
                                        <button className="dislike" onClick={(e) => addLike(e, a.answer_id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i> {a.likes}</button>
                                        &nbsp; &nbsp;
                                        <button className="like" onClick={(e) => addDislike(e, a.answer_id)}><i className="fa fa-thumbs-down"></i> {a.dislikes}</button>
                                    </div>
                                    {checkID(a.user_id) ? <div className="btn-toolbar">
                                        <button className="btn btn-info btn-sm editAnswer" data-toggle="modal" data-target="#editForm" onClick={(e) => selectID(e, a.answer_id, a.answer_text)}>Edit</button>
                                        &nbsp; &nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={(e) => { if (window.confirm('Are you sure you want to delete this item?')) deleteAnswer(e, a.answer_id)} }>Delete</button>
                                    </div> : <div></div>}
                                </div>
                            </div>
                            <div className="modal fade" id="editForm">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Edit answer</h4>
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
                                                placeholder="text"
                                                className="form-control my-3"
                                                value={answer_text}
                                                
                                                onChange={e => setAnswerText(e.target.value)} />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                className="btn btn-primary"
                                                data-dismiss="modal"
                                                onClick={(e) => editAnswer(e, selectedID)}
                                            >
                                                Confirm
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
                    </div>
                    )
                }
            </div>
            
        </Fragment>
    )
}

export default QuestionAnswers; 