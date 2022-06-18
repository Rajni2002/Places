import React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import "./styles.css";

import "./styles.css";

function Post({ post, setSelectedId }) {
  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
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
      <div className="details">
        <Typography variant="h6" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h5" className="title" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          {post.likeCount} Like
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
