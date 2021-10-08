import React, {Fragment, useState, useEffect} from "react";

const ChangePassword = (props) => {    //props.id  props.user_password

    const[newPassword, setNewPassword] = useState("");
    const[confPassword, setConfPassword] = useState("");

    const editPassword = async(e) => {
        e.preventDefault();
        
        if(newPassword != confPassword){
            alert("Passwords don't match!");
            setConfPassword("");
        }

        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = {newPassword};
            const response = await fetch(`/users/edit-pass/${props.id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            console.log(response.json());

            window.location.reload(false);

        } catch (err) {
            console.error(err.message);
        }

    }

    return (
        <Fragment>
            <form onSubmit={editPassword}>
                <h5>Change Password</h5>
                <div className="form-group my-3">
                    <label htmlFor="newPassword">New password</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="Enter new password" 
                        className="form-control" 
                        pattern=".{5,}"
                        title="minimum 5 characters"
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                <p className="forgot-password text-right">Password must be at least 5 characters long</p>    
                </div>
                <div className="form-group my-3">
                    <label htmlFor="confPassword">Confirm new password</label>
                    <input 
                        type="password" 
                        name="confPassword" 
                        placeholder="Confirm password" 
                        className="form-control" 
                        pattern=".{5,}"
                        title="minimum 5 characters"
                        onChange={e => setConfPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group my-3">
                    <button className="btn btn-primary btn-block" type="submit">Confirm</button>
                </div>
            </form>  
        </Fragment>
    )

}

export default ChangePassword;