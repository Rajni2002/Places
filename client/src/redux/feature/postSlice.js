import api from "../../api/index.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  createPostStatus: "",
  createPostError: "",
  getPostStatus: "",
  getPostError: "",
  deletePostStatus: "",
  deletePostError: "",
  updatePostStatus: "",
  updatePostError: "",
  likePostStatus: "",
  likePostError: "",
};

export const fetchPosts = createAsyncThunk(
  "/posts/fetchPosts",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "/posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "/posts/createPosts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "/posts/updatePost",
  async (obj, { rejectWithValue }) => {
    const { id, updatedPost } = obj;
    try {
      const response = await api.patch(`/posts/${id}`, updatedPost);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "/posts/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/posts/${id}/likepost`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const signin = createAsyncThunk(
  "/posts/signin",
  async (obj, { rejectWithValue }) => {
    try {
      // Log in the user ..
      console.log("!");
      const response = await api.post(`/users/signin`, obj.formData);
      localStorage.setItem("profile", JSON.stringify(response.data));
      obj.navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const signup = createAsyncThunk(
  "/posts/signup",
  async (obj, { rejectWithValue }) => {
    try {
      // Sign up in the user ..
      const response = await api.post(`/users/signup`, obj.formData);
      localStorage.setItem("profile", JSON.stringify(response.data));
      obj.navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    auth: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.payload?.data })
      );
      return {
        ...state,
        authData: action.payload?.data,
      };
    },
    logout: (state, action) => {
      localStorage.clear();
      action.payload.navigate("/");
      window.location.reload();
      return {
        ...state,
        authData: null,
      };
    },
  },
  extraReducers: {
    // Fetch Posts
    [fetchPosts.pending]: (state) => {
      return {
        ...state,
        getPostStatus: "pending",
      };
    },
    [fetchPosts.fulfilled]: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        getPostStatus: "success",
      };
    },
    [fetchPosts.rejected]: (state, action) => {
      return {
        ...state,
        getPostError: action.payload,
        getPostStatus: "rejected",
      };
    },
    // Create posts
    [createPost.pending]: (state) => {
      return {
        ...state,
        createPostStatus: "pending",
      };
    },
    [createPost.fulfilled]: (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
        createPostStatus: "success",
      };
    },
    [createPost.rejected]: (state, action) => {
      return {
        ...state,
        createPostError: action.payload,
        createPostStatus: "rejected",
      };
    },
    // Deleting the post
    [deletePost.pending]: (state) => {
      return {
        ...state,
        deletePostStatus: "pending",
      };
    },
    [deletePost.fulfilled]: (state, action) => {
      const prevState = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
      return {
        ...state,
        posts: prevState,
        deletePostStatus: "success",
      };
    },
    [deletePost.rejected]: (state, action) => {
      return {
        ...state,
        deletePostError: action.payload,
        deletePostStatus: "rejected",
      };
    },
    // Updating post
    [updatePost.pending]: (state) => {
      return {
        ...state,
        updatePostStatus: "pending",
      };
    },
    [updatePost.fulfilled]: (state, action) => {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return {
        ...state,
        posts: updatedPosts,
        updatePostStatus: "success",
      };
    },
    [updatePost.rejected]: (state, action) => {
      return {
        ...state,
        updatePostError: action.payload,
        updateStatus: "rejected",
      };
    },
    // Like the post
    [likePost.pending]: (state) => {
      return {
        ...state,
        likePostStatus: "pending",
      };
    },
    [likePost.fulfilled]: (state, action) => {
      const likedpost = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return {
        ...state,
        posts: likedpost,
        likePostStatus: "success",
      };
    },
    [likePost.rejected]: (state, action) => {
      return {
        ...state,
        likePostError: action.payload,
        likePostStatus: "rejected",
      };
    },
    // Sign up
    [signup.pending]: (state) => {
      return {
        ...state,
        signupStatus: "pending",
      };
    },
    [signup.fulfilled]: (state, action) => {
      console.log("4");
      return {
        ...state,
        authData: action.payload,
        signupStatus: "success",
      };
    },
    [signup.rejected]: (state) => {
      return {
        ...state,
        signupStatus: "rejected",
      };
    },
    // Sign IN
    [signin.pending]: (state) => {
      return {
        ...state,
        signinStatus: "pending",
      };
    },
    [signin.fulfilled]: (state, action) => {
      return {
        ...state,
        authData: action.payload,
        signinStatus: "success",
      };
    },
    [signin.rejected]: (state) => {
      return {
        ...state,
        signinStatus: "rejected",
      };
    },
  },
});

export const { auth, logout } = postSlice.actions;

export default postSlice.reducer;
