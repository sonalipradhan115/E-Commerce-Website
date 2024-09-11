import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingForm from "../assets/loadingForm.gif";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState("send-stage");
  const [otpEntered, setOtpEntered] = useState("");
  const [generatedOtp,setGeneratedOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginShow,setLoginShow] = useState(false);

  const handlecheckOtp = (e) => {
    e.preventDefault();
    if (otpEntered.length !== 0 && otpEntered === generatedOtp) {
      setCurrentStage("change-stage");
    } else {
      toast.error("wrong OTP", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handlesendOTP = async (e) => {
    e.preventDefault();
    const reGrex = /\S+@\S+\.\S+/;
    const otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
      setGeneratedOtp(otp);
    if (userEmail && reGrex.test(userEmail) && otp) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/reset-password/otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: userEmail, Otp: otp }),
          }
        );
        const checkresponse = await response.json();
        if (checkresponse.message === "otp-sent") {
          toast.success("OTP sent to your Gmail!", {
            pauseOnHover: false,
            autoClose: 3000,
            theme: "dark",
          });
          setCurrentStage("type-stage");
        } else if (checkresponse.message === "not-found") {
          toast.warn("Gmail not registered!", {
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
      toast.warning("fill proper gmail!", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newpassword.length === 0 || confirmPassword.length === 0) {
      toast.warning("fill new Password!", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    } else if (newpassword !== confirmPassword) {
      toast.warning("Password don't match!", {
        pauseOnHover: false,
        autoClose: 3000,
        theme: "dark",
      });
    } else if (newpassword === confirmPassword) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/user/update",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:userEmail,password:newpassword}),
          }
        );
        await response.json();
        toast.success("Password Changed SuccessFully!", {
            pauseOnHover: false,
            autoClose: 3000,
            theme: "dark",
          });
          setNewPassword("");
          setConfirmPassword("");
          setLoginShow(true);
      } catch (err) {
        alert("Error occured! Try later");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="mainEmailPage">
      {currentStage === "send-stage" && (
        <div className="emailpagemain">
          <h3 className="h3Ins">Enter your registered email:</h3>
          <input
            placeholder="enter email"
            type="email"
            name="email"
            id=""
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {loading === true ? (
            <img src={loadingForm} alt="" />
          ) : (
            <>
              <button className="submit-btn" onClick={handlesendOTP}>
                Get OTP
              </button>
              <button className="submit-btn" onClick={() => navigate("/")}>
                Go Back
              </button>
            </>
          )}
        </div>
      )}
      {currentStage === "type-stage" && (
        <div className="emailpagemain">
          <h3 className="h3Ins">Enter the OTP:</h3>
          <h3>Also check spam folder!</h3>
          <input
            placeholder="enter OTP"
            type="text"
            name="otp"
            id=""
            value={otpEntered}
            onChange={(e) => setOtpEntered(e.target.value)}
          />
          <button className="submit-btn" onClick={handlecheckOtp}>
            Submit
          </button>
        </div>
      )}

      {currentStage === "change-stage" && (
        <div className="emailpagemain">
          <h3 className="h3Ins">Set new Password:</h3>
          <input
            placeholder="password"
            type="text"
            name="password"
            id=""
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Confirm password"
            type="text"
            name="password"
            id=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {loading === true ? (
            <img src={loadingForm} alt="" />
          ) : (
            <>
              {!loginShow && (<button className="submit-btn" onClick={handleChangePassword}>
                Change Password
              </button>)}
              {loginShow && (<h3 className="greenPC">Password Changed!</h3>)}
              {loginShow && (<button className="submit-btn" onClick={()=>navigate("/")}>
                Login Now
              </button>)}
            </>
          )}
        </div>
      )}
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default PasswordChange;
