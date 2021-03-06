import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import './login.css';

const Login = ({setAuth}) => {
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

            if(parseRes == "Password or email is incorrect"){
                alert("Password or email is incorrect");
                setAuth(false);
            }

            else{
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="inner">
                    <form onSubmit={onSubmitForm}>
                        <h3>Login</h3>
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
                                pattern=".{5,}"
                                title="minimum 5 characters"
                                onChange={e => onChange(e)}
                                required
                            />
                        <p className="forgot-password text-right">Password must be at least 5 characters long</p>    
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-primary btn-block">Login</button>
                        </div>
                        <p className="forgot-password text-right">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </form>
                </div>     
            </div>
          
        </Fragment>
    )
}

export default Login;