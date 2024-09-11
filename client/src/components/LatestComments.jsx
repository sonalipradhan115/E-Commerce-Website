import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/loadingGif.gif";
import notfound from '../assets/notfound.png'

const LatestReviews = ({ id }) => {
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [commentAdded, setCommentAdded] = useState(false);
  const [comments, setComments] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    setUserMail(email);
    setRandomIndex(Math.floor(Math.random() * 7));
  }, [id]);
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/comment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setComments(result.data);
      }
    } catch (err) {
      alert("error while fetching comments!");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id && inputData && userMail) {
      try {
        const response = await fetch("http://localhost:8080/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: id,
            email: userMail,
            comment: inputData,
          }),
        });
        await response.json();
        toast.success("comment added!", {
          pauseOnHover: false,
          autoClose: 2000,
          theme: "dark",
        });
        setCommentAdded(!commentAdded);
      } catch (err) {
        alert("error while commenting!");
      } finally {
        setInputData("");
      }
    } else {
      toast.warning("comment can't be empty!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    fetchComments();
  }, [id]);
  useEffect(() => {
    fetchComments();
  }, [commentAdded]);

  return (
    <div className="mainReview-section">
      <div className="subReview-section">
        <h2>Latest Comments:</h2>
        <div className="Review-section-1">
          <input
            placeholder="type something..."
            className="review-input"
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button className="btn-review" onClick={handleSubmit}>
            Comment
          </button>
        </div>
      </div>
      {loading && <img src={loadingGif} alt="" />}
      {loading === false && comments.length !== 0 && (
        <div className="commentArea-main">
          {comments.length>5 && comments.slice(comments.length-5).reverse().map((item) => (
            <div key={item._id} className="maindivcomment">
              <p className="user-comment">{item.comment}</p>
              <div className="rowcommeP">
                <span>
                  By:
                  <span className="comment-user-name">
                    {" "}
                    {item.email.split("@")[0] + " "}
                    {userMail===item.email && <span>{"(You)"}</span>}
                  </span>
                </span>
              </div>
            </div>
          ))}
          {comments.length <= 5 && comments.slice(0).reverse().map((item) => (
            <div key={item._id} className="maindivcomment">
              <p className="user-comment">{item.comment}</p>
              <div className="rowcommeP">
                <span>
                  By:
                  <span className="comment-user-name">
                    {" "}
                    {item.email.split("@")[0] + " "}
                    {userMail===item.email && <span>{"(You)"}</span>}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {loading === false && comments.length === 0 && (
        <>
          <h4 className="dummyh">No Comments till now!</h4>
            <img src={notfound} alt="" />
        </>
      )}

      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default LatestReviews;
