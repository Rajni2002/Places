import api from "../../api/index.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const response = await api.get("/posts").catch((err) => {
    console.log(err);
  });
  console.log(response);
  return response;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      entities: [],
      loading: false,
    },
  },
  reducers: {
    createPost: (state, action) => {},
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },extraReducers:{
    [fetchPosts.pending]: (state) => {
      state.posts.loading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      state.posts.entities = payload.data;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.loading = false;
    },
  }
});

export const { createPost, setPosts } = postSlice.actions;

export default postSlice;
