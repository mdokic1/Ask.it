import React, {Fragment, useState, useEffect} from "react";
import AddQuestion from "./addQuestion";
import './questionsList.css';

const QuestionsList = ({setAuth}) => {

    const [questions, setQuestions] = useState([]);  // prazan niz
    const [questionsRange, setQuestionsRange] = useState(20); //promijeniti na 20 !!!!!

    async function getQuestions(){
        try {
            const response = await fetch("http://localhost:5000/my-questions/", {
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

    async function deleteQuestion(id) {
        try {
          await fetch(`/my-questions/delete-question/${id}`, {
            method: "DELETE",
            headers: { token: localStorage.token }
          });
    
          setQuestions(questions.filter(question => question.question_id !== id));
        } catch (err) {
          console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
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
                                    <small className="mb-0">{getDate(q.question_date)}</small>
                                    {/* <button type="button" class="btn close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button> */}
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="heading">{q.question_text}</p>
                                <div className="mt-3 d-flex justify-content-between">
                                    <p><i className="fa fa-thumbs-up" aria-hidden="true"></i> {q.likes} 
                                    &nbsp; &nbsp; <i className="fa fa-thumbs-down"></i> {q.dislikes}</p>
                                    <div className="btn-toolbar">
                                        {/* <button className="btn btn-info btn-sm viewAnswers">View answers</button>
                                        &nbsp; &nbsp; */}
                                        <button className="btn btn-danger btn-sm deleteQuestion" onClick={(e) => deleteQuestion(q.question_id)}>Delete</button>
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