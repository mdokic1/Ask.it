import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './homepage.css';

const Homepage = ({setAuth}) => {

    const[newestQuestions, setNewestQuestions] = useState([]);
    const[mostAnswers, setMostAnswers] = useState([]);
    const[mostLiked, setMostLiked] = useState([]);
    const [questionsRange, setQuestionsRange] = useState(20);

    async function getNewestQuestions(){
        try {
            const response = await fetch("http://localhost:5000/my-questions/all-questions", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.question_date > b.question_date) ? -1 : ((b.question_date > a.question_date) ? 1 : 0))
            setNewestQuestions(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getMostAnswersUsers(){
        try {
            const response = await fetch("http://localhost:5000/users/all-users", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.answers > b.answers) ? -1 : ((b.answers > a.answers) ? 1 : 0))
            setMostAnswers(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getMostLikedQuestions(){
        try {
            const response = await fetch("http://localhost:5000/my-questions/all-questions", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            //setName(parseRes.firstname);
            parseRes.sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
            setMostLiked(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const loadMore = (e) => {
        e.preventDefault()
        setQuestionsRange(questionsRange + 2)
        console.log("range" + questionsRange);
    }

    const getDate = (date) => {
        var dat = new Date(date);
        return dat.toDateString() + ", " + (dat.getHours()<10?'0':'') + dat.getHours() + ":" + (dat.getMinutes()<10?'0':'') + dat.getMinutes();
    }

    useEffect(() => {
        getNewestQuestions();
        getMostAnswersUsers();
        getMostLikedQuestions();

    }, []);

    return (
        <Fragment>
            <div className="wrapper">
                <div className="row">
                    <div className="col-sm">
                        <h4>Newest Questions</h4>
                        <div className="list-group scroll">
                        {
                            newestQuestions.slice(0, questionsRange).map(q => 
                                <div key={q.question_id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <h5>{q.title}</h5>
                                        <div className="ms-2 c-details">
                                            {/* <small className="mb-0">{getDate(q.question_date)}</small> */}
                                            {/* <button type="button" class="btn close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button> */}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="heading">{getDate(q.question_date)}</p>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <p><i className="fa fa-thumbs-up" aria-hidden="true"></i> {q.likes} 
                                            &nbsp; &nbsp; <i className="fa fa-thumbs-down"></i> {q.dislikes}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                        &nbsp; &nbsp;
                        <div className="col text-center">
                            <button className="btn btn-secondary loadMore" onClick={e => loadMore(e)}>Load More</button>
                        </div>
                    </div>
                    <div className="col-sm">
                        <h4>People with most answers</h4>
                        <div className="list-group no-scroll">
                            {
                                mostAnswers.slice(0,3).map(u => 
                                    <div key={u.user_id} className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <h5>{u.firstname} {u.lastname}</h5>
                                        </div>
                                        <div className="mt-3">
                                            <p className="heading">Answered questions: {u.answers}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-sm">
                        <h4>Questions with most likes</h4>
                        <div className="list-group no-scroll">
                            {
                                mostLiked.slice(0,3).map(q => 
                                    <div key={q.question_id} className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <h5>{q.title}</h5>
                                            <div className="ms-2 c-details">
                                                {/* <small className="mb-0">{getDate(q.question_date)}</small> */}
                                                {/* <button type="button" class="btn close" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button> */}
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="heading">{getDate(q.question_date)}</p>
                                            <div className="mt-3 d-flex justify-content-between">
                                                <p><i className="fa fa-thumbs-up" aria-hidden="true"></i> {q.likes} </p> 
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>   
            </div>
        </Fragment>
    )
}

export default Homepage;