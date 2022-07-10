import React from "react";
import Post from "./Post/Post.jsx";
import "./styles.css";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

function Posts({setSelectedId}) {
  const {posts, isLoading} = useSelector((state) => state.post);
  if(!posts.length && !isLoading) return (<h1>No Posts</h1>)
  return isLoading ? (
    <CircularProgress className="loader"/>
  ) : (
    <Grid className="mainContainer" container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={4}>
          <Post post={post} setSelectedId={setSelectedId}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
