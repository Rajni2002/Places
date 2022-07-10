import express from "express";
import {
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostById,
  postComment
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts); // just Showing all of the posts independent of the auth

// with Auth middleware
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost);
router.post("/:id/commentpost", auth, postComment);

// without Auth middleware
router.get('/search', getPostsBySearch);
router.get('/:id', getPostById);

export default router;
