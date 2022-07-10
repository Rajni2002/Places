import React from "react";
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
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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
    // <ButtonBase
    // onClick={() => {
    //   navigate(`/posts/${post._id}`);
    // }}
    //   ></ButtonBase>
    <Card className="card" raised elevation={6}>
      <CardMedia
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
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
        <div className="details">
          <Typography variant="h6" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography variant="h4" className="title" gutterBottom>
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            className="title"
            gutterBottom
            color="textSecondary"
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
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
