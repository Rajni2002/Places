import api from "../../api/index.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const response = await api.get("/posts").catch((err) => {
    console.log(err);
  });
  return response.data;
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

export const updatePost = createAsyncThunk(
  "/posts/updatePost",
  async (obj) => {
    const {id, updatedPost} = obj;
    console.log(updatedPost);
    const response = await api
      .patch(`/posts/${id}`, updatedPost)
      .catch((err) => console.log(err));
    const data = response.data;
    return {id, data};
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      entities: [],
      loading: false,
    },
  },
  // reducers: {
  //   createPosts: (state, action)=>{

  //   },
  //   setPosts: (state, action)=>{

  //   }
  // },
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
    // Updating the post
    [updatePost.pending]: (state) => {
      state.posts.loading = true;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.posts.loading = false;
      const prevState = state.posts.entities;
      state.posts.entities = prevState.map((post) =>
        post._id === payload.id ? payload.data : post
      );
    },
    [updatePost.rejected]: (state) => {
      state.posts.loading = false;
    },
  },
});

// export const { createPosts, setPosts } = postSlice.actions;
export default postSlice;
