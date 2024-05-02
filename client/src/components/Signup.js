import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/notes/AlertContext";

import modeContext from "../context/notes/ModeContext";

const Signup = () => {
  let localhost = "http://localhost:8000";
  // let localhost = "https://server-dtl61rb7y-chakrinya009s-projects.vercel.app";
  let content2 = useContext(modeContext);
  let { mode } = content2;
  let context = useContext(alertContext);
  let { showalert } = context;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let changing = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  let submitted = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      // alert("Enter password properly");
      showalert("Enter password properly", "danger");
    } else {
      let response = await fetch(`${localhost}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      let r = await response.json();
      if (r.success) {
        //save the auth-token
        localStorage.clear();
        localStorage.setItem("token", r.auth_token);
        //redirect
        navigate("/");
        showalert("Sucessfully logged in", "success");
      } else {
        showalert("This user already exits", "danger");
        // alert("This user already exits");
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        backgroundColor: mode === "dark" ? "#343a40" : "white",
        borderColor: mode === "dark" ? "white" : "black",
        color: mode === "dark" ? "white" : "black",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <div
        className="d-flex justify-content-center flex-column"
        style={{ flexGrow: "3", flexShrink: "1" }}
      >
        <h2 className="my-2">Sign Up</h2>
        <form onSubmit={submitted}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              placeholder="minLength=3"
              minLength={3}
              onChange={changing}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={changing}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={changing}
              placeholder="minLength=5"
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={changing}
              placeholder="minLength=5"
              minLength={5}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
