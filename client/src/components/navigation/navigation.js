import React from 'react'
import {Link} from "react-router-dom";
import './navigation.css';

const Navigation = (props) => {
   
    let items;

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
        window.location = "/home";
    }

    if(props.isAuthenticated){
        items = (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/home"}>Homepage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/questions"}>Questions page</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/myquestions"}>My questions</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>My profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/home"} onClick={(e) => logout(e)}>Logout</Link>
                        {/* ovo ce vracati na homepage */}
                    </li>
                </ul>
            </div>
        )
    }
    else{
        items = (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/home"}>Homepage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/questions"}>Questions page</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>Register</Link>
                    </li>
                </ul>
            </div>
        )
    }
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <Link className="navbar-brand" to={"/login"}>Ask.it</Link>
                {items}
        </nav>
    )
}

export default Navigation;