// Modules & dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

// Routes
import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouter);//This route can be accessed by /posts route only not by '/'
app.use('/users', userRouter);

app.get("/", (req, res)=>{
  res.send('App is Running - properly');
})

const PORT = process.env.PORT || 1317;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
  