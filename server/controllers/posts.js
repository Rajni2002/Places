import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("Post Fetched");
    res.send(postMessages);
    // res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
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
  res.json({message: "Post deleted Successfully"});
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Invalid");
    return res.status(404).send("post is Invalid");
  }
  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true})
  res.json(updatedPost);
}