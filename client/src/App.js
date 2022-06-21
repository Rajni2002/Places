import "./App.css";
import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import places from "./images/places.png";
import "./styles.css";
import { fetchPosts } from "./redux/feature/postSlice";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedId]);
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className="appBar">
        <Typography variant="h3" align="center" className="heading">
          Places
        </Typography>
        <img src={places} alt="places" height="60" className="image" />
      </AppBar>
      <Grow in>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing="3"
        >
          <Grid item xs={12} sm={7}>
            <Posts setSelectedId={setSelectedId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form selectedId={selectedId} setSelectedId={setSelectedId}/>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
}

export default App;
