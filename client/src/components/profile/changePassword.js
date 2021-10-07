import React, {Fragment, useState} from "react";

const ChangePassword = () => {

    return (
        <Fragment>
            
            <div className="form-group my-3">
                <label htmlFor="currPassword">Current password</label>
                <input 
                    type="password" 
                    name="currPassword" 
                    placeholder="Enter current password" 
                    className="form-control" 
                    // value={password}
                    pattern=".{5,}"
                    // onChange={e => onChange(e)}
                    required
                />
            {/* <p className="forgot-password text-right">Password must be at least 5 characters long</p>     */}
            </div>
            <div className="form-group my-3">
                <label htmlFor="newPassword">New password</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    placeholder="Enter new password" 
                    className="form-control" 
                    // value={password}
                    pattern=".{5,}"
                    // onChange={e => onChange(e)}
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
                    // value={password}
                    pattern=".{5,}"
                    // onChange={e => onChange(e)}
                    required
                />
            {/* <p className="forgot-password text-right">Password must be at least 5 characters long</p>     */}
            </div>
            <div className="form-group my-3">
                <button className="btn btn-primary btn-block">Confirm</button>
            </div>
          
        </Fragment>
    )

}

export default ChangePassword;