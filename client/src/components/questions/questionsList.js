import React, {Fragment, useState, useEffect} from "react";
import AddQuestion from "./addQuestion";
import './questionsList.css';

const QuestionsList = ({setAuth}) => {

    const [questions, setQuestions] = useState([]);  // prazan niz
    const [questionsRange, setQuestionsRange] = useState(20); //promijeniti na 20 !!!!!

    async function getQuestions(){
        try {
            const response = await fetch("/my-questions/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            parseRes.sort((a,b) => (a.question_date > b.question_date) ? -1 : ((b.question_date > a.question_date) ? 1 : 0))
            setQuestions(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getDate = (date) => {
        var dat = new Date(date);
        return dat.toDateString() + ", " + (dat.getHours()<10?'0':'') + dat.getHours() + ":" + (dat.getMinutes()<10?'0':'') + dat.getMinutes();
    }

    const loadMore = (e) => {
        e.preventDefault()
        setQuestionsRange(questionsRange + 2)
        console.log("range" + questionsRange);
    }
    

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <Fragment>
            <br/>
            <h3>My Questions</h3>
            <br/>
            <AddQuestion/>
            <div className="list-group scroll">
                {
                    questions.slice(0, questionsRange).map(q => 
                        <div key={q.question_id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <h5>{q.title}</h5>
                                <div className="ms-2 c-details">
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="heading">{q.question_text}</p>
                                <div className="mt-3 d-flex justify-content-between">
                                    <p><i className="fa fa-thumbs-up" aria-hidden="true"></i> {q.likes} 
                                    &nbsp; &nbsp; <i className="fa fa-thumbs-down"></i> {q.dislikes}</p>
                                    <div className="btn-toolbar">
                                    </div>
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
        </Fragment>
    )
}

export default QuestionsList; 