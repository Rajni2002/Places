import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../redux/feature/postSlice";

function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => state.post);
  useEffect(() => {
    if (page) dispatch(fetchPosts(page));
  }, [dispatch, page]);
  return (
    <Pagination
      style={{ width: "100%" }}
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}

export default Paginate;
