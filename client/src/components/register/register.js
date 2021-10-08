import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import '../login/login.css';

const Register = ({setAuth}) => {

    const[inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const{firstname, lastname, email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();   // da se ne refresha stranica kada se klikne register

        try {
            const body = {firstname, lastname, email, password}

            const response = await fetch(
                "/auth/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            if(parseRes == "User already exists"){
                alert("User already exists");
            }
            else{
                window.location = "/login";
            }
            //localStorage.setItem("token", parseRes.token);
            //setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="inner">
                    <form onSubmit={onSubmitForm}>
                        <h3>Register</h3>
                        <div className="form-group my-3">
                            <label htmlFor="firstname">Name</label>
                            <input 
                                type="text" 
                                name="firstname" 
                                placeholder="Enter name" 
                                className="form-control" 
                                value={firstname}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="lastname">Surname</label>
                            <input 
                                type="text" 
                                name="lastname" 
                                placeholder="Enter surname" 
                                className="form-control" 
                                value={lastname}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter email" 
                                className="form-control" 
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter password" 
                                className="form-control" 
                                value={password}
                                onChange={e => onChange(e)}
                                pattern=".{5,}"
                                title="minimum 5 characters"
                                required
                            />
                            <p className="forgot-password text-right">Password must be at least 5 characters long</p>
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-primary btn-block">Register</button>
                        </div>
                        
                        <p className="forgot-password text-right">
                            Already registered? <Link to="/login">Log in</Link>
                        </p>
                    </form>
                </div>     
            </div>
        </Fragment>
    )
}

export default Register;