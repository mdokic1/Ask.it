import './App.css';
import React, {Fragment, useState, useEffect} from "react";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/login/login"
import Register from "./components/register/register"
import QuestionsList from "./components/questions/questionsList"
import Navigation from "./components/navigation/navigation"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: {token : localStorage.token}
      });
      
      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {    // kada se uradi refresh ne vraca se odmah na login, nego provjerava token
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <Navigation {...{isAuthenticated}} setAuth = {setAuth} />
        <div className="container">
          <Switch>
          <Route exact path="/login" render={
            props => !isAuthenticated ? <Login {... props} setAuth = {setAuth} /> : <Redirect to="/myquestions" />}  // ako je autentikacija uspjela ide na myquestions, a ako nije onda ide login
          />
          <Route exact path="/register" render={
            props => !isAuthenticated ? <Register {... props} setAuth = {setAuth} /> : <Redirect to="/login" />}
          />
          <Route exact path="/myquestions" render={
            props => isAuthenticated ? <QuestionsList {... props} setAuth = {setAuth} /> : <Redirect to="/login" />}
          />
          </Switch>
        </div>  
      </Router>
    </Fragment>
  );
}

export default App;

