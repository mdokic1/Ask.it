import React, {Fragment, useState} from "react";

const ChangeUserInfo = () => {

    return (
        <Fragment>
            
            <div className="form-group my-3">
                <label htmlFor="firstname">Name</label>
                <input 
                    type="text" 
                    name="firstname" 
                    placeholder="Enter name" 
                    className="form-control" 
                    // value={password}
                    // pattern=".{5,}"
                    // onChange={e => onChange(e)}
                    required
                />   
            </div>
            <div className="form-group my-3">
                <label htmlFor="lastname">Surname</label>
                <input 
                    type="text" 
                    name="lastname" 
                    placeholder="Enter lastname" 
                    className="form-control" 
                    // value={password}
                    // pattern=".{5,}"
                    // // onChange={e => onChange(e)}
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
                    // value={email}
                    // onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className="form-group my-3">
                <button className="btn btn-primary btn-block">Confirm</button>
            </div>
          
        </Fragment>
    )

}

export default ChangeUserInfo;