import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import CommentSection from "./CommentSection.jsx";

import useStyles from "./styles.js";
import { getPostById, getPostBySearch } from "../../redux/feature/postSlice.js";

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.post);
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [dispatch, post]);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommPosts = posts.filter(({ _id }) => _id !== post._id);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommPosts.length !== 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like :{" "}
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/posts/${_id}`);
                  }}
                  key={_id}
                >
                  {title}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
}

export default PostDetails;
