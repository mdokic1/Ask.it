import React, {Fragment, useEffect, useState} from "react";
import './homepage.css';

const Homepage = ({setAuth}) => {

    const[newestQuestions, setNewestQuestions] = useState([]);
    const[mostAnswers, setMostAnswers] = useState([]);
    const[mostLiked, setMostLiked] = useState([]);
    const [questionsRange, setQuestionsRange] = useState(20);

    async function getNewestQuestions(){
        try {
            const response = await fetch("/my-questions/all-questions", {
                method: "GET",
                // headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            parseRes.sort((a,b) => (a.question_date > b.question_date) ? -1 : ((b.question_date > a.question_date) ? 1 : 0))
            setNewestQuestions(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getMostAnswersUsers(){
        try {
            const response = await fetch("/users/all-users", {
                method: "GET",
                // headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            parseRes.sort((a,b) => (a.answers > b.answers) ? -1 : ((b.answers > a.answers) ? 1 : 0))
            setMostAnswers(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getMostLikedQuestions(){
        try {
            const response = await fetch("/my-questions/all-questions", {
                method: "GET",
                // headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            parseRes.sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
            setMostLiked(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const loadMore = (e) => {
        e.preventDefault()
        setQuestionsRange(questionsRange + 2)
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
                        <h5>Newest questions</h5>
                        <div className="list-group home-scroll">
                        {
                            newestQuestions.slice(0, questionsRange).map(q => 
                                <div key={q.question_id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="title">{q.title}</h6>
                                        <div className="ms-2 c-details">
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <small className="heading">Posted on: {getDate(q.question_date)}</small>
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
                        <h5>Top 3 people with the most answers</h5>
                        <div className="list-group no-scroll">
                            {
                                mostAnswers.slice(0,3).map(u => 
                                    <div key={u.user_id} className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="title">{u.firstname} {u.lastname}</h6>
                                        </div>
                                        <div className="mt-3">
                                            <small className="heading">Answered questions: {u.answers}</small>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-sm">
                        <h5>Top 3 questions with the most likes</h5>
                        <div className="list-group no-scroll">
                            {
                                mostLiked.slice(0,3).map(q => 
                                    <div key={q.question_id} className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="title">{q.title}</h6>
                                            <div className="ms-2 c-details">
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <small className="heading">Posted on: {getDate(q.question_date)}</small>
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