import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/users.js";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does'nt exist", code: 404 });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Invalid Credentials", code: 400 });

    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token: jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Something Went wrong in Signing Up" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ message: "User already exists", code: 409 });
    if (password !== confirmPassword)
      return res
        .status(403)
        .json({ message: "Password Don't match", code: 403 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const jwtToken = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token: jwtToken });
  } catch (err) {
    res.status(500).json({ message: "Something Went wrong in Signing in" });
  }
};
