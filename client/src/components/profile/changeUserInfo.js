import React, {Fragment, useState, useEffect} from "react";

const ChangeUserInfo = (props) => {
    
    const [name, setName] = useState(props.name);
    const [surname, setSurname] = useState(props.surname);
    const [email, setEmail] = useState(props.email);

    useEffect(() => {
        setName(props.name)
        setSurname(props.surname)
        setEmail(props.email)
    }, [props.name, props.surname, props.email])

    const editUser = async(e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            const body = {name, surname, email};
            const response = await fetch(`/users/edit/${props.id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body)
            });


            window.location.reload(false);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <form onSubmit={editUser}>
                <h5>Change Personal Information</h5>
                <div className="form-group my-3">
                    <label htmlFor="firstname">Name</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder="Enter name" 
                        className="form-control" 
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}
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
                        defaultValue={surname}
                        onChange={e => setSurname(e.target.value)}
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="characters@characters.domain"
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group my-3">
                    <button className="btn btn-primary btn-block">Confirm</button>
                </div>
            </form> 
        </Fragment>
    )

}

export default ChangeUserInfo;