import React, {Fragment, useState, useEffect} from "react";
import AddQuestion from "./addQuestion";
import './questionAnswers.css';
import {useParams, withRouter} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import AddAnswer from "../answers/addAnswer";
import { parse } from "dotenv";
// import "bootstrap/dist/css/bootstrap.min.css";

const QuestionAnswers = ({setAuth}) => {
    const {id} = useParams()
    //logged();
    //console.log("IDDD" + id);
    const [answers, setAnswers] = useState([]);  // prazan niz
    const [name, setName] = useState("");
    const [newAnswerForm, setNewAnswerForm] = useState(false);
    const [answer_text, setAnswerText] = useState("");
    const [selectedID, setSelectedID] = useState(0);
    const [question, setQuestion] = useState("");
    const [loggedIn, setLoggedIn] = useState([]);

    async function findLoggedUser(){
        try {
            const response = await fetch(`http://localhost:5000/users/user-logged`, {
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

    async function findQuestion(id){
        try {
            const response = await fetch(`http://localhost:5000/my-questions/question/${id}`, {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setQuestion(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }
    

    async function getAnswers(){
        try {
            const response = await fetch(`http://localhost:5000/answers/all-answers/${id}`, {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.answer_date > b.answer_date) ? -1 : ((b.answer_date > a.answer_date) ? 1 : 0))
            
            setAnswers(parseRes);

            findLoggedUser();

            findQuestion(id);


        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteAnswer(e, id) {
        e.preventDefault();

        try {
          await fetch(`http://localhost:5000/answers/delete/${id}`, {
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

    async function getUser(id){
        //e.preventDefault();
      try {
        const result = await fetch(`http://localhost:5000/users/user/${id}`, {
            method: "GET",
            headers: {token: localStorage.token}
        });

        const parseRes = await result.json();
        //return parseRes.fistname + " " + parseRes.lastname;
        //return parseRes.firstname;
        setName(parseRes);
        //console.log(name);
      } catch (err) {
          console.error(err.message);
      }

    }

    const author = (id) => {
        getUser(id);
        //return name.firstname;
        //return user.firstname + " " + user.lastname;
    }

    async function addLike(e, answer){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/answers/like/${answer}`, {
            method: "PUT",
            headers: {token: localStorage.token}

        });

        getAnswers();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function addDislike(e, answer){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/answers/dislike/${answer}`, {
            method: "PUT",
            headers: {token: localStorage.token}

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
            const response = await fetch(`http://localhost:5000/answers/edit/${answerID}`, {
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
        return id === loggedIn.user_id;
    }

    useEffect(() => {
        getAnswers();
    }, [])

    return (
        <Fragment>
            {/* <br/>
            <div className="list-group-item list-question">
                <div className="d-flex justify-content-between">
                    <h5>{question.title}</h5>
                    <div className="ms-2 c-details">
                        <small className="mb-0">{getDate(question.question_date)}</small>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="heading">{question.question_text}</p>
                    <div className="mt-3 d-flex justify-content-between">
                        <p><i className="fa fa-thumbs-up" aria-hidden="true"></i> {question.likes} 
                        &nbsp; &nbsp; <i className="fa fa-thumbs-down"></i> {question.dislikes}</p>
                    </div>
                </div>
            </div> */}
            <br/>
            <h3>Answers</h3>
            <div className="list-group answers-list">
                {
                    answers.map(a => 
                        <><div key={a.answer_id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <h5></h5>
                                <div className="ms-2 c-details">
                                    {/* {author(a.user_id)}
                                    <small>{name.firstname}</small> */}
                                    {/* <button onClick={(e) => getUser(e, q.user_id)}>Korisnik</button> */}
                                    <small className="mb-0">{getDate(a.answer_date)}</small>
                                </div>
                                {/* , {getDate(q.question_date)} */}
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
                                        <button className="btn btn-danger btn-sm" onClick={(e) => deleteAnswer(e, a.answer_id)}>Delete</button>
                                    </div> : <div></div>}
                                </div>
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
                        </div></>
                    )
                }
            </div>
            
        </Fragment>
    )
}

export default QuestionAnswers; 