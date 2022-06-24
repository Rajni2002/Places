import api from "../../api/index.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const response = await api.get("/posts").catch((err) => {
    console.log(err);
  });
  return response.data;
});

export const deletePost = createAsyncThunk("/posts/deletePost", async (id) => {
  const response = await api
    .delete(`/posts/${id}`)
    .catch((err) => console.log(err));
  return id;
});

export const createPost = createAsyncThunk(
  "/posts/createPosts",
  async (data) => {
    console.log(data);
    const response = await api.post("/posts", data).catch((err) => {
      console.log(err);
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk("/posts/updatePost", async (obj) => {
  const { id, updatedPost } = obj;
  console.log(updatedPost);
  const response = await api
    .patch(`/posts/${id}`, updatedPost)
    .catch((err) => console.log(err));
  const data = response.data;
  return { id, data };
});

export const likePost = createAsyncThunk("/posts/likePost", async (id)=>{
  const response = await api.patch(`/posts/${id}/likepost`).catch((err) => {
    console.log(err);
  });
  const data = response.data;
  return { id, data };
})

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      entities: [],
      loading: false,
    },
  },
  extraReducers: {
    // Fetch Posts
    [fetchPosts.pending]: (state) => {
      state.posts.loading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      state.posts.entities = payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.loading = false;
    },
    // Create posts
    [createPost.pending]: (state) => {
      state.posts.loading = true;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      state.posts.entities = [...state.posts.entities, payload];
    },
    [createPost.rejected]: (state) => {
      state.posts.loading = false;
    },
    // Deleting the post
    [deletePost.pending]: (state) => {
      state.posts.loading = true;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      const prevState = state.posts.entities;
      state.posts.entities = prevState.filter((post)=> post._id !== payload);
    },
    [deletePost.rejected]: (state) => {
      state.posts.loading = false;
    },
    // Updating post
    [updatePost.pending]: (state) => {
      state.posts.loading = true;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      const {id, data} = payload
      state.posts.entities.map((post)=> post._id === id ? data : post)
    },
    [updatePost.rejected]: (state) => {
      state.posts.loading = false;
    },
    // Like the post
    [likePost.pending]: (state) => {
      state.posts.loading = true;
    },
    [likePost.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      const {id, data} = payload
      state.posts.entities.map((post)=> post._id === id ? data : post)
    },
    [likePost.rejected]: (state) => {
      state.posts.loading = false;
    },
  },
});

export default postSlice;
