import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { postComment } from "../../redux/feature/postSlice";

function CommentSection({ post }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("profile"));
  async function handleClick() {
    const finalComment = `${user.result.name}: ${comment}`;
    const id = post._id;
    const { payload } = await dispatch(postComment({ finalComment, id }));
    setComments(payload.comments);
    setComment("");
    commentRef.current.focus();
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments.map((commentItem, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              {commentItem}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user && (
          <div style={{ width: "100%" }}>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Write a comment !"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px", width: "40%" }}
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
