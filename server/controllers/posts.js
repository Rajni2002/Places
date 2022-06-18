import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages, "IN try of getPosts");
    res.send(postMessages);
    // res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log("Done creatingPost");
  } catch (error) {
    console.log("Fail creatingPost");
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)){
    console.log("Invalid");
    return res.status(404).send("post is Invalid");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
