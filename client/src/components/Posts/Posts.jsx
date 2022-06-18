import React from "react";
import Post from "./Post/Post.jsx";
import "./styles.css";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

function Posts({setSelectedId}) {
  const { entities } = useSelector((state) => state.post.posts);
  return !entities.length ? (
    <CircularProgress />
  ) : (
    <Grid className="mainContainer" container alignItems="stretch" spacing={3}>
      {entities.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} setSelectedId={setSelectedId}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
