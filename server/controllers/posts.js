import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startingIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startingIndex);
    console.log("Post Fetched");
    res.status(200).json({
      posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
    // res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    console.log("Post Created");
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Fail creatingPost");
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Invalid");
    return res.status(404).send("post is Invalid");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  console.log("Post Updated");
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Invalid");
    return res.status(404).send("post is Invalid");
  }
  await PostMessage.findByIdAndRemove(_id);
  console.log("Post Deleted");
  res.json({ id: _id, message: "Post deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Invalid");
    return res.status(404).send("post is Invalid");
  }
  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postComment = async (req, res) => {
  const { id } = req.params;
  const {finalComment} = req.body;
  const post = await PostMessage.findById(id);
  console.log(finalComment)
  post.comments.push(finalComment);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
