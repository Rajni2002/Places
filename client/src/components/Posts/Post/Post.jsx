import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import "./styles.css";
import { deletePost, likePost } from "../../../redux/feature/postSlice";
import { useDispatch } from "react-redux";

function Post({ post, setSelectedId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;

  const truncate = (str, len) => {
    if (str.length > len) {
       if (len <= 3) {
          return str.slice(0, len - 3) + "...";
       }
       else {
          return str.slice(0, len) + "...";
       };
    }
    else {
       return str;
    };
 };
  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className="card" raised elevation={6}>
      <CardMedia
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className="overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setSelectedId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="large" />
          </Button>
        </div>
      )}

      <ButtonBase
        className="buttonBase"
        onClick={() => {
          navigate(`/posts/${post._id}`);
        }}
      >
        <div className="head-cover">
          <Typography variant="h6" color="primary">{post.name}</Typography>
          <Typography variant="body2" color="primary">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="details" style={{ width: "80%" }}>
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ width: "100%" }}
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent style={{width: "85%"}}>
          <Typography
            variant="h4"
            className="title"
            gutterBottom
            style={{ width: "100%" }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            className="title"
            gutterBottom
            color="textSecondary"
            align="justify"
          >
            {truncate(post.message, 100)}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          onClick={async () => {
            dispatch(likePost(post._id));
            console.log(likes.length);
            if (likes.length && likes.find((like) => like === userId)) {
              setLikes(likes.filter((id) => id !== userId));
            } else {
              setLikes([...likes, userId]);
            }
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
