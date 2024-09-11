import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import person from "../assets/person.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentuser] = useState("");
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setCurrentuser(email);
    } else {
      navigate("/");
    }
  }, []);
  const gotoUserdetail = () => {
    navigate("/userdetail");
  };
  return (
    <div className="mainNav">
      {location.pathname == "/" && <h2>BookStore</h2>}
      {location.pathname !== "/" && location.pathname === "/Signup" && (
        <h2 onClick={() => navigate("/")}>BookStore</h2>
      )}
      {location.pathname !== "/" && location.pathname === "/passwordChange" && (
        <h2 onClick={() => navigate("/")}>BookStore</h2>
      )}
      {location.pathname !== "/" &&
        location.pathname !== "/Signup" &&
        location.pathname !=="/passwordChange" && (
            <h2 onClick={() => navigate("/Home")}>BookStore</h2>
          )}
      {location.pathname !== "/" &&
        location.pathname !== "/Signup" &&
        location.pathname !== "/passwordChange" && (
          <div className="useraccount" onClick={gotoUserdetail}>
            Profile
            <img src={person} alt="" />
          </div>
        )}
    </div>
  );
};

export default Navbar;
