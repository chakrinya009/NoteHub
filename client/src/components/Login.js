import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/AlertContext';

import modeContext from '../context/notes/ModeContext';


const Login = () => {
    
    let localhost = "http://localhost:8000";
//    let localhost ="https://server-dtl61rb7y-chakrinya009s-projects.vercel.app";
    let content2 = useContext(modeContext);
    let { mode } = content2;
    let context = useContext(alertContext);
    let { showalert } = context;
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let changing = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    let submitted = async (e) => {
        e.preventDefault();
        let response = await fetch(`${localhost}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        let r = await response.json();
        if (r.success) {
            //save the auth-token
            localStorage.clear();
            localStorage.setItem("token", r.auth_token);
            //redirect
            navigate("/");
            showalert("Sucessfully logged in", "success");

        }
        else {
            // alert("Incorrect credentials");

            showalert("Incorrect credentials", "danger");

        }
    }
    return (
        <div style={{ display: "flex", height: "80vh", backgroundColor: mode === 'dark' ? '#343a40' : 'white', borderColor: mode === 'dark' ? 'white' : 'black', color: mode === 'dark' ? 'white' : 'black',marginLeft:"10px",marginRight:"10px" }} >
           
            <div className='d-flex justify-content-center flex-column' style={{ flexGrow: "3", flexShrink: "1" }}>
                <h2 className='mb-3'>Log In</h2>
                <form onSubmit={submitted}>
                    <div className="mb-3">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={changing} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={credentials.password} onChange={changing} name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary"  >Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Login
