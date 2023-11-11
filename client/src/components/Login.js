import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import loginimg from './login-img.png';


const Login = (props) => {

    const context = useContext(noteContext);
    const {showAlert , host } = context ;

    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();
    if(localStorage.getItem('token')){
        history.push('/');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if (json.Success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.auth_token);
            history.push("/");
            showAlert("Logged in Successfully " , "success");
        }
        else{
            showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='mt-5 d-flex'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" placeholder='minimum of 8 characters' id="password" />
                </div>

                <button disabled={credentials.password.length<8} type="submit" className="btn btn-primary">Submit</button>
            </form>
            <img src={loginimg} style={{width:'60%',marginLeft:'20%'}} alt=''></img>
        </div>
    )
}

export default Login