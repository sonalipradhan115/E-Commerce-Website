import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import loadingGif from "../assets/loadingGif.gif";

const Userdetail = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [activeBtn, setActiveBtn] = useState("MyPosts");
  const [postdata, setPostdata] = useState([]);
  const [orderdata, setOrderdata] = useState([]);
  const [sellerdata, setSellerdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setUserName(email.split("@")[0]);
      setCurrentUser(email);
    } else {
      navigate("/");
    }
  }, []);

  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };

  const UserPostdetails = async () => {
    if (currentUser && activeBtn === "MyPosts") {
      try {
        setloading(true);
        const response = await fetch(
          `http://localhost:8080/post/userdetail/${currentUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setPostdata(result.data);
        }
      } catch (err) {
        alert("error occured while fetching!");
      } finally {
        setloading(false);
      }
    } else if (currentUser && activeBtn === "MyOrders") {
      try {
        setloading(true);
        const response = await fetch(
          `http://localhost:8080/order/${currentUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setOrderdata(result.data);
        }
      } catch (err) {
        alert("error occured while fetching!");
      } finally {
        setloading(false);
      }
    }else if(currentUser && activeBtn === "MySales") {
      try {
        setloading(true);
        const response = await fetch(
          `http://localhost:8080/order/sales/${currentUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setSellerdata(result.data);
        }
      } catch (err) {
        alert("error occured while fetching!");
      } finally {
        setloading(false);
      }
    }
  };
  useEffect(() => {
    UserPostdetails();
  }, [currentUser]);
  useEffect(() => {
    UserPostdetails();
  }, [activeBtn]);
  return (
    <div className="mainUserdetail">
      <div className="image-contain">
        <img src="https://source.unsplash.com/1600x900/?mountains" alt="" />
        <div className="logoutBtn" onClick={logoutFunc}>
          <img src={logout} alt="" />
          <p className="lgtUP">Logout</p>
        </div>
      </div>
      <div className="userProName">
        <div className="userpro">{userName?.charAt(0).toUpperCase()}</div>
        <div className="userN">{userName}</div>
      </div>
      <div className="btn-bar">
        <button
          onClick={() => {
            setActiveBtn("MyPosts");
            UserPostdetails();
          }}
          className={`${
            activeBtn === "MyPosts" ? "addbackground" : "removeBackground"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setActiveBtn("MyOrders")}
          className={`${
            activeBtn === "MyOrders" ? "addbackground" : "removeBackground"
          }`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveBtn("MySales")}
          className={`${
            activeBtn === "MySales" ? "addbackground" : "removeBackground"
          }`}
        >
          My Sales
        </button>
      </div>
      <div className="postsdiv">
        {loading ? (
          <img src={loadingGif} alt="" />
        ) : (
          <>
          {activeBtn==="MyPosts" && postdata.length===0 && (
            <h3>No books posted for sale!</h3>
          )}
          {activeBtn==="MyPosts" && postdata?.map((post) => (
            <div key={post._id} className="card">
              <div className="imgdiv">
                <img src={post?.image} alt="book-image" />
              </div>
              <div className="card-contents">
                <h3>
                  {post?.title?.length > 20
                    ? post?.title.slice(0, 20) + "..."
                    : post?.title}
                </h3>
                <p className="HpostAu">
                  {post?.author.length > 20
                    ? post?.author.slice(0, 20) + "..."
                    : post?.author}
                </p>
                <p>
                  price: ₹ &nbsp;<span>{post?.price}</span>
                </p>
                <p>{post?.description.slice(0, 20) + "..."}</p>
                <div className="eddel-btns">
                  <button
                    className="knowmore"
                    onClick={() => navigate(`/postdetail/${post._id}`)}
                  >
                    Know more
                  </button>
                </div>
              </div>
            </div>
          ))}
          {activeBtn==="MyOrders" && orderdata.length===0 && (
            <h3>No purchase done!</h3>
          )}
          {activeBtn==="MyOrders" && orderdata?.map((post)=>(
            <div key={post._id} className="card">
            <div className="imgdiv">
              <img src={post?.itemimage} alt="book-image" />
            </div>
            <div className="card-contents">
              <h3>
                {post?.itemname?.length > 20
                  ? post?.itemname.slice(0, 20) + "..."
                  : post?.itemname}
              </h3>
              <p className="HpostAu">
                {post?.itemauthor.length > 20
                  ? post?.itemauthor.slice(0, 20) + "..."
                  : post?.itemauthor}
              </p>
              <p>seller:{post?.seller.split("@")[0].length>30 ? post?.seller.split("@")[0].slice(0,30)+'...' : post?.seller.split("@")[0]}</p>
              <p>
                price: ₹ &nbsp;<span>{post?.itemprice}</span> 
              </p>
              <p>
                quantity:&nbsp;<span>{post?.itemquantity}</span>
              </p>
              <p>
                total: ₹ &nbsp;<span>{post?.itemprice * post?.itemquantity}</span> /-
              </p>
              <div className="eddel-btns">
                <button
                  className="knowmore"
                  onClick={() => navigate(`/postdetail/${post.itemId}`)}
                >
                  product
                </button>
              </div>
            </div>
          </div>
          ))}
          {activeBtn==="MySales" && sellerdata.length===0 && (
            <h3>No sales till now!</h3>
          )}
          {activeBtn==="MySales" && sellerdata?.map((post)=>(
            <div key={post._id} className="card">
            <div className="imgdiv">
              <img src={post?.itemimage} alt="book-image" />
            </div>
            <div className="card-contents">
              <h3>
                {post?.itemname?.length > 20
                  ? post?.itemname.slice(0, 20) + "..."
                  : post?.itemname}
              </h3>
              <p className="HpostAu">
                {post?.itemauthor.length > 20
                  ? post?.itemauthor.slice(0, 20) + "..."
                  : post?.itemauthor}
              </p>
              <p>buyer: &nbsp;{post?.buyer.split("@")[0]}</p>
              <p>
                price: ₹ &nbsp;<span>{post?.itemprice}</span> 
              </p>
              <p>
                quantity:&nbsp;<span>{post?.itemquantity}</span>
              </p>
              <p>
                total: ₹ &nbsp;<span>{post?.itemprice * post?.itemquantity}</span> /-
              </p>
              <div className="eddel-btns">
                <button
                  className="knowmore"
                  onClick={() => navigate(`/postdetail/${post.itemId}`)}
                >
                  Know more
                </button>
              </div>
            </div>
          </div>
          ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Userdetail;
