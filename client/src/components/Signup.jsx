import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingForm from '../assets/loadingForm.gif'

const Signup = () => {
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({ email: "", password: "" });
  const [generatedOtp,setGeneratedOtp] = useState('');
  const [enteredOtp,setEnteredOtp] = useState('');
  const [currentStage,setCurrentStage] = useState('send-stage');
  const [loading, setLoading] = useState(false);
  const [userEmail,setUserEmail] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogindata({ ...logindata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reGrex = /\S+@\S+\.\S+/
    const { email, password } = logindata;
    if (email && password && reGrex.test(email)) {
      try {
        const response = await fetch("http://localhost:8080/user/signup", {
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
        if (checkRoN.message === 'exist'){
          toast.warn("Email exist,please login!", {
            pauseOnHover: false,
            autoClose: 2000,
            theme: "dark",
          });
          setLogindata({email:'',password:''})
        }
        else {
          alert("Account Created!")
          navigate('/')
        }
      } catch (err) {
        alert(err);
      }
    } else {
      toast.warn("fill all details with valid email!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  const handlesendOTP = async (e) => {
    e.preventDefault();
    const reGrex = /\S+@\S+\.\S+/;
    const otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    setGeneratedOtp(otp);
    if (logindata.email && reGrex.test(logindata.email) && otp) {
      setUserEmail(logindata.email)
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/signupotp/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: logindata.email, Otp: otp }),
          }
        );
        const checkresponse = await response.json();
        if (checkresponse.message === "otp-sent") {
          toast.success("OTP sent to your Gmail!", {
            pauseOnHover: false,
            autoClose: 3000,
            theme: "dark",
          });
          setCurrentStage("otp-stage");
        } else if (checkresponse.message === "found") {
          toast.warn("Gmail already registered!", {
            pauseOnHover: false,
            autoClose: 3000,
            theme: "dark",
          });
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("fill proper gmail!", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  const handleCheckOTP = (e) => {
    e.preventDefault();
    if(enteredOtp.length!==0 && enteredOtp===generatedOtp){
      handleSubmit(e);
    }else{
      toast.error("Invalid OTP", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    }
  }

  return (
    <div className="loginMain">
      <div className="form-login">
        <h2>Sign Up</h2>
        {currentStage==='send-stage' && (
          <input
          placeholder="enter email"
          type="email"
          name="email"
          id=""
          value={logindata.email}
          onChange={handleChange}
        />
        )}
        {currentStage==='otp-stage' && (
          <h3>Also check spam folder!</h3>
        )}
        {currentStage==='otp-stage' && (
          <input
          placeholder="enter email"
          type="email"
          name="email"
          id=""
          value={userEmail}
          onChange={handleChange}
        />
        )}
        {currentStage==="otp-stage" && (
          <input
          placeholder="enter password"
          type="text"
          name="password"
          id=""
          value={logindata.password}
          onChange={handleChange}
        />
        )}
        {currentStage==="otp-stage" && (
          <input
          placeholder="enter OTP"
          type="text"
          name="otp"
          id=""
          value={enteredOtp}
          onChange={(e)=>setEnteredOtp(e.target.value)}
        />
        )}
        
        {currentStage==='send-stage' && loading === false && (
          <button className="submit-btn" onClick={handlesendOTP} >Get OTP</button>
        )}
        {currentStage==='send-stage' && loading === true && (
          <img src={loadingForm} alt="" />
        )}
        {currentStage==='otp-stage' && loading === false && (
          <button className="submit-btn" type="submit" onClick={handleCheckOTP}>
          Submit
        </button>
        )}
        {currentStage==='otp-stage' && loading === true && (
          <img src={loadingForm} alt="" />
        )}
        <h3> <span>OR</span> <Link to="/">Login</Link></h3>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default Signup;
