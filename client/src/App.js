import './App.css';
import React, {Fragment, useState, useEffect} from "react";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/login/login"
import Register from "./components/register/register"
import QuestionsList from "./components/questions/questionsList"
import Navigation from "./components/navigation/navigation"
import QuestionsPage from "./components/questions/questionsPage"
import Homepage from "./components/homepage/homepage"
import QuestionAnswers from './components/questions/questionAnswers';
import MyProfile from './components/profile/myProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async() =>{
    try {
      const response = await fetch("/auth/is-verified", {
        method: "POST",
        headers: {token : localStorage.token}
      });
      
      const parseRes = await response.json();
      //const parseRes = true;
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
    //setIsAuthenticated(false);
  }

  useEffect(() => {    // kada se uradi refresh ne vraca se odmah na login, nego provjerava token
    isAuth();
    //setIsAuthenticated(false);
  }, []);

  return (
    <Fragment>
      <Router>
        <Navigation {...{isAuthenticated}} setAuth = {setAuth} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" render={
              props => !isAuthenticated ? <Login {... props} setAuth = {setAuth} /> : <Redirect to="/myquestions" />}  // ako je autentikacija uspjela ide na myquestions, a ako nije onda ide login
            />
            {/* <Route path="/register" render={
              props => !isAuthenticated ? <Register {... props} setAuth = {setAuth} /> : <Redirect to="/login" />}
            /> */}
             <Route path="/register" component={Register}/>
            {/* <Route path="/myquestions" render={
              props => isAuthenticated ? <QuestionsList {... props} setAuth = {setAuth} /> : <Redirect to="/login" />}
            /> */}
            {/* <Route exact path="/questions" render={
              props => isAuthenticated ? <QuestionsPage {... props} setAuth = {setAuth} /> : <Redirect to="/home" />}
            /> */}
            <Route path="/myquestions" render={
              props => <QuestionsList {... props} setAuth = {setAuth} />}
            />
            <Route path="/question-answers/:id/:check" component={QuestionAnswers}/>
            {/* <Route path="/question-answers/:id" component={QuestionAnswers}/>  */}
            <Route path="/questions" render={
              props => <QuestionsPage {... props} {...{isAuthenticated}} setAuth = {setAuth} />}
            />
            {/* <Route path="/questions" component={QuestionsPage}/> */}
            <Route path="/home" component={Homepage}/>
            <Route path="/profile" component={MyProfile}/>
          </Switch>
        </div>  
      </Router>
    </Fragment>
  );
}

export default App;

