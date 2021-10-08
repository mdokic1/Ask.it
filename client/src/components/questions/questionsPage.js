import React, {Fragment, useState, useEffect} from "react";
import AddQuestion from "./addQuestion";
import './questionsPage.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import AddAnswer from "../answers/addAnswer";
import { parse } from "dotenv";
import { Redirect } from "react-router";
// import "bootstrap/dist/css/bootstrap.min.css";

const QuestionsPage = (props) => {

    console.log("Ulogovaan " + props.isAuthenticated);

    const [questions, setQuestions] = useState([]);  // prazan niz
    const [name, setName] = useState();
    const [answer_text, setAnswerText] = useState("");
    const [selectedID, setSelectedID] = useState(0);
    const [showButtonAdd, setShowButtonAdd] = useState(false);
    const [loggedIn, setLoggedIn] = useState([]);
    //const [redirect, setRedirect] = useState(false)

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

    
    //else setShowButtonAdd(false);

    async function getQuestions(){
        try {
            const response = await fetch("http://localhost:5000/my-questions/all-questions", {
                method: "GET",
                // headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.question_date > b.question_date) ? -1 : ((b.question_date > a.question_date) ? 1 : 0))
            setQuestions(parseRes);
            if(props.isAuthenticated){
                console.log("Usaoo");
                findLoggedUser();
            }
            
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    // const logout = (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     setAuth(false);
    // }
    const checkID = (id) => {
        if(props.isAuthenticated){
            return id === loggedIn.user_id;
        }
        return false;
    }

    const getDate = (date) => {
        var dat = new Date(date);
        return dat.toDateString() + ", " + (dat.getHours()<10?'0':'') + dat.getHours() + ":" + (dat.getMinutes()<10?'0':'') + dat.getMinutes();
    }

    const selectID = (e, id) =>{
        e.preventDefault();
        setSelectedID(id);
    }

    // async function getUser(id){
    //     //e.preventDefault();
    //   try {
    //     const result = await fetch(`http://localhost:5000/users/user/${id}`, {
    //         method: "GET",
    //         headers: {token: localStorage.token}
    //     });

    //     const parseRes = await result.json();
    //     //return parseRes.fistname + " " + parseRes.lastname;
    //     //return parseRes.firstname;
    //     setName(parseRes);
    //     //console.log(name);
    //   } catch (err) {
    //       console.error(err.message);
    //   }

    // }

    // const author = (id) => {
    //     getUser(id);
    //     return name.firstname;
    //     //return user.firstname + " " + user.lastname;
    // }

    async function addLike(e, question){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/my-questions/like/${question}`, {
            method: "PUT",
            // headers: {token: localStorage.token}

        });

        getQuestions();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function addDislike(e, question){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/my-questions/dislike/${question}`, {
            method: "PUT",
            headers: {token: localStorage.token}

        });

        getQuestions();

        } catch (err) {
            console.error(err.message);
        }
    }

    async function newAnswer(e, user) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/add-answer/${user}`, {
            method: "PUT",
            headers: {token: localStorage.token}

        });

        getQuestions();
        console.log("Usao");

        } catch (err) {
            console.error(err.message);
        }
    }

    async function addAnswer(e, question){
        //console.log(question);
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = { answer_text };
            const response = await fetch(`http://localhost:5000/answers/add-answer/${question}`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            console.log(parseResponse);
            newAnswer(e, loggedIn.user_id);

            //   setQuestionsChange(true);
            //setTitle("");
            setAnswerText("");
        } catch (err) {
            console.error(err.message);
        }
    }

    const viewAnswers = (e, id) => {
        e.preventDefault();
        selectID(e, id);
        let check = props.isAuthenticated;
        //console.log("CHEECK ");
        //return name.firstname;
        window.location = `/question-answers/${id}/${check}`;
        //setRedirect(true);
        //return <Redirect to="/question-answers" id={id} check={check} />
        //return user.firstname + " " + user.lastname;
    }

    useEffect(() => {
        getQuestions();
        if(props.isAuthenticated) setShowButtonAdd(true);
    }, [])

    // if(redirect){
    //     return <Redirect to="/question-answers" id={selectedID} check={props.isAuthenticated} />
    // }

    return (
        // key={q.question_id}
        <Fragment>
            {/* <br/>
            <h2>All questions</h2>
            <br/> */}
            {/* <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button> */}
            {/* <AddQuestion/> */}

            <br/>
            <h3>Questions</h3>
            <div className="list-group all-scroll">
                {
                      questions.map(q =>  
                        <div key={q.question_id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <h5>{q.title}</h5>
                                <div className="ms-2 c-details">
                                    {/* <small>{author(q.user_id)}</small> */}
                                    {/* <button onClick={(e) => getUser(e, q.user_id)}>Korisnik</button> */}
                                    <small className="mb-0">{getDate(q.question_date)}</small>
                                </div>
                                {/* , {getDate(q.question_date)} */}
                            </div>
                            <div className="mt-3">
                                <p className="heading">{q.question_text}</p>
                                <div className="mt-3 d-flex justify-content-between">
                                    <div className="btn-toolbar">
                                        <button className="dislike" onClick={(e) => addLike(e, q.question_id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i> {q.likes}</button>
                                        &nbsp; &nbsp;
                                        <button className="like" onClick={(e) => addDislike(e, q.question_id)}><i className="fa fa-thumbs-down"></i> {q.dislikes}</button>
                                    </div>
                                    <div className="btn-toolbar">
                                    {/* showButtonAdd && !checkID(q.user_id) &&  */}
                                        {showButtonAdd && !checkID(q.user_id) && <button className="btn btn-info btn-sm addAnswer" data-toggle="modal" data-target="#addForm" onClick={(e) => selectID(e, q.question_id)}>Add answer</button>}
                                        &nbsp; &nbsp;
                                        <button className="btn btn-info btn-sm viewAnswers" onClick={(e) => viewAnswers(e, q.question_id)}>View answers</button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="addForm">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Add answer</h4>
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
                                                onChange={e => setAnswerText(e.target.value)} required />

                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                data-dismiss="modal"
                                                onClick={(e) => addAnswer(e, selectedID)}
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
                        </div>
                        
                    )
                }
            </div>
            
        </Fragment>
    )
}

export default QuestionsPage; 