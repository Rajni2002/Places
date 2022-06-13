// Modules & dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import postRouter from './routes/posts.js'

const app = express();

app.use('/posts', postRouter);//This route can be accessed by /posts route only not by '/'

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://admin-rajni:R%40jni2002@cluster0.zibs8.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 1317;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
