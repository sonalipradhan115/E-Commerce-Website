import React, { useEffect, useState } from "react";
import loadingGif from "../assets/loadingGif.gif";
import { useParams, useNavigate } from "react-router-dom";
import cstar from "../assets/cstar.png";
import star from "../assets/star.png";
import LatestComments from "./LatestComments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetails = () => {
  const navigate = useNavigate();
  const [postdata, setPostdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [currentUser, setCurrentUser] = useState("");
  const [totalMoney, setTotalMoney] = useState(null);
  const [initialMoney, setInitialMoney] = useState(null);
  const [priceupdate, setPriceUpdate] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setCurrentUser(email);
    }
  }, []);

  const deleteOrNot = () => {
    let foo = prompt(`Type "book" to delete!`);
    if (foo === "book") {
      deletePost();
    } else {
      toast.warning("Type Correct to delete!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const deletePost = async () => {
    try {
      const respose = await fetch(`http://localhost:8080/post/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (respose.ok) {
        await respose.json();
        navigate("/Home");
      }
    } catch (error) {
      alert("Error occured white deleting post!");
    }
  };

  const incre = () => {
    if (itemQuantity < 100) {
      setItemQuantity(itemQuantity + 1);
      setPriceUpdate(!priceupdate);
    }
  };
  const decre = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      setPriceUpdate(!priceupdate);
    }
  };
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setPostdata(result.data);
        setInitialMoney(result.data[0].price);
        setTotalMoney(result.data[0].price);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [id]);

  useEffect(() => {
    const totalCartValue = parseInt(initialMoney * itemQuantity);
    setTotalMoney(totalCartValue);
  }, [priceupdate]);
  useEffect(() => {
    const totalCartValue = parseInt(initialMoney * itemQuantity);
    setTotalMoney(totalCartValue);
  }, [id]);

  const handleBuydata = async (e, sellerEmail) => {
    e.preventDefault();
    if (currentUser && sellerEmail && id) {
      try {
        const response = await fetch("http://localhost:8080/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyer: currentUser,
            seller: sellerEmail,
            itemId: id,
            itemimage: postdata[0]?.image,
            itemname: postdata[0]?.title,
            itemauthor: postdata[0]?.author,
            itemprice: postdata[0]?.price,
            itemquantity: itemQuantity,
          }),
        });
        await response.json();
      } catch (err) {
        alert("cannot create a buy data!");
      }
    }
  };
  const handleBuy = async (e, sellerEmail) => {
    e.preventDefault();
    const options = {
      key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEYID,
      key_secret: import.meta.env.VITE_REACT_APP_RAZORPAY_SECRET,
      amount: totalMoney * 100,
      currency: "INR",
      name: "Books Store",
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        handleBuydata(e, sellerEmail);
      },
      theme: {
        color: "#0A0A0A",
      },
    };
    const rz_pay = new window.Razorpay(options);
    rz_pay.open();
  };
  return (
    <div className="backCl">
      {postdata && (
        <div className="mainPost-detail">
          <div className="rowumrtwo">
            <div className="pdimage-div">
              <img src={postdata[0]?.image} alt="" />
            </div>
            <div className="post-contents">
              <div className="pcontent1">
                <h2>{postdata[0]?.title}</h2>
                <h3>{postdata[0]?.author}</h3>
                <hr className="lineH" />
                <p>
                  {"product " + "#"}
                  <span className="cppw">{id}</span>
                </p>
                <p>
                  category: <span className="cppw">{postdata[0].category}</span>
                </p>
                <hr className="lineH" />
              </div>
              <div className="pcontent2">
                <img src={cstar} alt="" />
                <img src={cstar} alt="" />
                <img src={cstar} alt="" />
                <img src={cstar} alt="" />
                <img src={star} alt="" />
                <p className="pc2p">
                  {"("}
                  {Math.floor(Math.random() * 100) + 1}&nbsp;{"reviews)"}
                </p>
              </div>
              <hr className="lineH" />
              <div className="pcontent3">
                <span className="spanU">
                  Status: <span className="innersp">&nbsp;InStock</span>
                </span>
                <hr className="lineH linep3" />
              </div>
              <div className="pcontent4">
                <p className="p4pDes">Description: </p>
                <p className="cppw">
                  {postdata[0]?.description.length > 300
                    ? postdata[0]?.description.slice(0, 300) + "..."
                    : postdata[0]?.description}
                </p>
              </div>
              <div className="pcontent5">
                <span className="p5Sym">₹</span>
                <span className="p5price">{totalMoney}</span>
              </div>
              {currentUser !== postdata[0]?.email && (
                <div className="content6">
                  <span className="IDbtn" onClick={decre}>
                    -
                  </span>
                  <span className="itemQ">{itemQuantity}</span>
                  <span className="IDbtn" onClick={incre}>
                    +
                  </span>
                  <button
                    className="btn-buy"
                    onClick={(e) => handleBuy(e, postdata[0]?.email)}
                  >
                    Buy
                  </button>
                </div>
              )}
              {currentUser === postdata[0]?.email && (
                <div className="postedUr">
                  <h3>You posted this book for sale!</h3>
                  <div className="ownwe-postdiv">
                    <button
                      className="btn-buy"
                      onClick={() => navigate(`/UpdateForm/${id}`)}
                    >
                      Edit
                    </button>
                    <button className="btn-buy" onClick={() => deleteOrNot(id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <LatestComments id={id}/>
        </div>
      )}
      {postdata === null && (
        <div className="loadingGiff">
          <img src={loadingGif} alt="" />
        </div>
      )}
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default PostDetails;
