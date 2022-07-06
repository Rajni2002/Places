import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/feature/postSlice";
import { Grow, Grid, Paper, AppBar, TextField, Container, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedId]);

  function searchPost(){
    if(search.trim()){
      // Dispatch -> Fetch sarch post
    }else{
      navigate("/");
    }
  }
  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      searchPost();
    }
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          // className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing="3"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setSelectedId={setSelectedId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Posts"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(tag) => {
                  setTags([...tags, tag]);
                }}
                onDelete={(tagToDelete) =>
                  setTags(tags.filter((tag) => tag !== tagToDelete))
                }
                label="Search by Tags"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >Search</Button>
            </AppBar>
            <Form selectedId={selectedId} setSelectedId={setSelectedId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
