import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from '../context/notes/AlertContext';
import { useContext } from 'react';
import modeContext from '../context/notes/ModeContext';

const Navbar = () => {
    let context2=useContext(modeContext);
    let {mode,toggleMode}=context2;
    let navigate = useNavigate();
    let location = useLocation();
    let context = useContext(alertContext);
    let { showalert } = context;
    //   useEffect(() => {
    //     // console.log(location.pathname);          //useEffect is just to show location.path
    //   }, [location]);
    let logout = () => {
        localStorage.clear();
        navigate("/login");
        showalert("Logged out", "success");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">NoteHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === "/" ? "active" : "")}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === "/about" ? "active" : "")}`} to="/about">About</Link>
                        </li>


                    </ul>
                    <div className={`form-check form-switch text-${(mode === 'light') ? 'dark' : 'light'} mx-2`}>
                        <input className="form-check-input" onClick={toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{color:"white"}}>Enable Darkmode</label>
                    </div>

                    {!localStorage.getItem('token') ?
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
                        </form> :
                        <button className='btn btn-primary mx-2' onClick={logout}>Log Out</button>}
                    

                </div>
            </div>
        </nav>
    )
}

export default Navbar
