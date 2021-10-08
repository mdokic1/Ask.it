import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import './myProfile.css';
import ChangeUserInfo from './changeUserInfo';
import ChangePassword from "./changePassword";

const MyProfile = ({setAuth}) => {
    const [loggedIn, setLoggedIn] = useState([]);

    async function findLoggedUser(){
        try {
            const response = await fetch(`/users/user-logged`, {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            setLoggedIn(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        findLoggedUser();
    }, [])
    
    return (
        <Fragment>
            <div className="container">
                <div className="inner forms">
                    <h3>Welcome {loggedIn.firstname} {loggedIn.lastname}!</h3>
                    <br/>
                    <div className="left-form">
                       <ChangeUserInfo id={loggedIn.user_id} name={loggedIn.firstname} surname={loggedIn.lastname} email={loggedIn.email}/>
                    </div>
                    <div className="right-form">
                        <ChangePassword id={loggedIn.user_id} user_password={loggedIn.user_password}/> 
                    </div>
                </div>     
            </div>
          
        </Fragment>
    )
}

export default MyProfile;