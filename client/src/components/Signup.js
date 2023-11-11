import React , {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import signupimg from './signup-img.png';

const Signup = (props) => {
    
    const context = useContext(noteContext);
    const {showAlert} = context ;

    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""});
    let history = useHistory();
    if(localStorage.getItem('token')){
        history.push('/');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.cpassword!==credentials.password){
            showAlert("Confirmation password does not match with Password",'danger');
            history.push('/signup');
        }
        else{
        const response = await fetch("http://localhost:5000/api/auth/create_user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if (json.Success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.auth_token);
            history.push("/");
            showAlert("Account created successfully","success");
        }
        else{
            showAlert("Invalid credentials","danger");
        }
    }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-5 d-flex'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control " value={credentials.password} onChange={onChange} name="password" id="password" placeholder='minimum of 8 characters'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control " value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" placeholder='minimum of 8 characters'/>
                </div>
                <button disabled={credentials.password.length<8 || credentials.cpassword.length<8} type="submit" className="btn btn-primary">Submit</button>
            </form>
            <img src={signupimg}  style={{width:'60%',marginLeft:'20%'}} alt=''/>
        </div>
    )
}

export default Signup