import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/feature/postSlice";
import { Grow, Grid } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedId]);
  return (
    <Grow in>
      <Grid
        container
        className="mainContainer"
        justifyContent="space-between"
        alignItems="stretch"
        spacing="3"
      >
        <Grid item xs={12} sm={7}>
          <Posts setSelectedId={setSelectedId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form selectedId={selectedId} setSelectedId={setSelectedId} />
        </Grid>
      </Grid>
    </Grow>
  );
}

export default Home;