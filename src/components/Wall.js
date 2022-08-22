import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "./1646201151294.JPEG";
function Wall(props) {
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState(0);

  useEffect(() => {
    axios.post("http://127.0.0.1:3001/allComments", { id: 1 }).then((res) => {
      setAllComments(res.data);
      console.log(allComments);
    });
  }, [newComment]);
  // const replyHandler=(e)=>{
  //     console.log(e);
  //     setIsReply(true)
  // }
  const replyPost = (e) => {
    console.log(e);

    axios
      .post("http://127.0.0.1:3001/comment", {
        id: 1,
        // commentId:null,
        text: comment,
        user: props.user,
        pCommentId: e,
      })
      .then((res) => {
        console.log(res.data);
        console.log(allComments);
        setNewComment(!newComment);
      });
  };
  const clickHandler = () => {
    console.log(comment);
    setCommentId(commentId + 1);
    console.log(commentId);
    axios
      .post("http://127.0.0.1:3001/comment", {
        id: 1,
        // commentId:commentId,
        text: comment,
        user: props.user,
        pCommentId: null,
      })
      .then((res) => {
        console.log(res.data);
        console.log(allComments);
        setNewComment(!newComment);
      });
  };
  return (
    <div>
      <p>Title</p>
      <img src={image} alt="post"></img>
      <div>
        {allComments.map((data) => {
          console.log(data);
          return (
            <div>
              {!data.pCommentId ? <div><h4>{data.user}</h4>{data.text}</div> : <p>{data.user}:replied {data.text}</p>}
              <input
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                placeholder="Write a reply... "
              ></input>
              <button
                onClick={(e) => {
                  replyPost(data._id);
                }}
              >
                Reply
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          type="text"
          placeholder="Write a comment..."
        />
        <button
          onClick={() => {
            clickHandler();
          }}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default Wall;
