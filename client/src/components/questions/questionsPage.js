import React, {Fragment, useState, useEffect} from "react";
import AddQuestion from "./addQuestion";
import './questionsPage.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import AddAnswer from "../answers/addAnswer";
// import "bootstrap/dist/css/bootstrap.min.css";

const QuestionsPage = ({setAuth}) => {

    const [questions, setQuestions] = useState([]);  // prazan niz
    const [questionsRange, setQuestionsRange] = useState(8); //promijeniti na 20 !!!!!
    const [user, setUser] = useState();
    const [newAnswerForm, setNewAnswerForm] = useState(false);
    const [answer_text, setAnswerText] = useState("");

    async function getQuestions(){
        try {
            const response = await fetch("http://localhost:5000/my-questions/all-questions", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.question_date > b.question_date) ? -1 : ((b.question_date > a.question_date) ? 1 : 0))
            setQuestions(parseRes);
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

    const getDate = (date) => {
        var dat = new Date(date);
        return dat.toDateString() + ", " + (dat.getHours()<10?'0':'') + dat.getHours() + ":" + (dat.getMinutes()<10?'0':'') + dat.getMinutes();
    }

    const showForm = (e) => {
        e.preventDefault();
        setNewAnswerForm(!newAnswerForm);
    }

    const ispisi = (e, id) =>{
        e.preventDefault();
        console.log(id);
    }

    async function getUser(id){
      try {
        const user = await fetch(`http://localhost:5000/users/user/${id}`, {
            method: "GET",
            headers: {token: localStorage.token}
        });

        const parseRes = await user.json();
        //return user;
        console.log(parseRes.firstname);
      } catch (err) {
          console.error(err.message);
      }
    }

    async function addLike(e, question){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/my-questions/like/${question}`, {
            method: "PUT",
            headers: {token: localStorage.token}

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

            //   setQuestionsChange(true);
            //setTitle("");
            setAnswerText("");
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <Fragment>
            <br/>
            <h2>All questions</h2>
            <br/>
            {/* <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button> */}
            {/* <AddQuestion/> */}
            <Accordion className="questions">
                {
                    questions.map(q => 
                        <><Card key={q.question_id}>
                            <Accordion.Toggle as={Card.Header} eventKey={q.question_id}>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <h5>{q.title}</h5>
                                        <div className="ms-2 c-details">
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
                                                <button className="btn btn-info btn-sm viewAnswers" data-toggle="modal" data-target="#forma" onClick={(e) => ispisi(e, q.question_id)}>Add answer</button>
                                                {/* data-toggle="modal" data-target="#forma" */}
                                            </div>
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
                                                                onClick={(e) => addAnswer(e, q.question_id)}
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
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                        </Card><Accordion.Collapse eventKey={q.question_id}>
                                <Card.Body>
                                    This is the first item's accordion body.
                                </Card.Body>
                            </Accordion.Collapse></>
                    )
                }
            </Accordion>
            <div className="formaDodavanje">
                {newAnswerForm && <Form.Control type="text" placeholder="Normal text" />}                             
                {/* onClick={setNewAnswerForm(!newAnswerForm)} */}
            </div>
            
        </Fragment>
    )
}

export default QuestionsPage; 