import "./App.css";
import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import places from "./images/places.png";
import "./styles.css";


function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className="appBar">
        <Typography variant="h2" align="center" className="heading">
          Places
        </Typography>
        <img  src={places} alt="places" height="60" className="image"/>
      </AppBar>
      <Grow in>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing="3"
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
}

export default App;
