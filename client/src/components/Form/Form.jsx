import React, { useState, useEffect } from "react";
import "./styles.css";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { createPost, updatePost } from "../../redux/feature/postSlice";
import { useDispatch, useSelector } from "react-redux";

function Form({ selectedId, setSelectedId }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) => {
    return selectedId
      ? state.post.posts.find((p) => p._id === selectedId)
      : null;
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  function clear() {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setSelectedId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.tags === "" ||
      postData.selectedFile === ""
    ) {
      alert("All fields must be field");
      return;
    }
    if (selectedId) {
      const obj = {
        id: selectedId,
        updatedPost: { ...postData, name: user?.result?.name },
      };
      dispatch(updatePost(obj));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setPostData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  if (!user?.result?.name) {
    return (
      <Paper className="paper">
        <Typography variant="h6" align="center">
          Please Sign In to create the post
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper elevation={12}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {selectedId ? "Edit" : "Create"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          className="input"
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Post"
          fullWidth
          className="input"
          value={postData.message}
          onChange={handleChange}
          rows={5}
          multiline
          maxRows={10}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          className="input"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
