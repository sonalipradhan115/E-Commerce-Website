import React, { useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const location = useLocation();
  if(location.state !== null && location.state.word !== null && location.state.word === 'logout'){
    toast.success("Logout Successfully!", {
      pauseOnHover: false,
      autoClose: 2000,
      theme: "dark",
    });
  }
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogindata({ ...logindata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logindata;
    if (email && password) {
      try {
        const response = await fetch("http://localhost:8080/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const checkRoN = await response.json();
        if (checkRoN.message === "exist" && logindata.password===checkRoN.data.password){
          localStorage.setItem('email', JSON.stringify(logindata.email));
          navigate('/Home');
        }
        else if(checkRoN.message==="exist" && logindata.password!==checkRoN.data.password){
          toast.warn("Wrong password!", {
            pauseOnHover: false,
            autoClose: 2000,
            theme: "dark",
          });
        }
        else {
          toast.warn("Please signup first!", {
            pauseOnHover: false,
            autoClose: 2000,
            theme: "dark",
          });
        }
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please fill all details");
    }
  };

  return (
    <div className="loginMain">
      <div className="form-login">
        <h2>Login with details</h2>
        <input
          placeholder="enter email"
          type="email"
          name="email"
          id=""
          value={logindata.email}
          onChange={handleChange}
        />
        <input
          placeholder="enter password"
          type="text"
          name="password"
          id=""
          value={logindata.password}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <h3> <span>OR</span> <Link to="/Signup">Sign Up</Link></h3>
        <h3 className="h3lfP"><Link to="/passwordChange">Forgot Password?</Link></h3>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default Login;
