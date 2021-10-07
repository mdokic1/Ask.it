import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import './myProfile.css';
import ChangeUserInfo from './changeUserInfo';
import ChangePassword from "./changePassword";

const MyProfile = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const{email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();   // da se ne refresha stranica kada se klikne login

        try {
            const body = {email, password}

            const response = await fetch(
                "/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
 
            localStorage.setItem("token", parseRes.token);
            setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="inner forms">
                    <h3>Welcome</h3>
                    <form className="left-form" onSubmit={onSubmitForm}>
                       <ChangeUserInfo/>
                    </form>
                    <form className="right-form">
                        <ChangePassword/> 
                    </form>
                </div>     
            </div>
          
        </Fragment>
    )
}

export default MyProfile;