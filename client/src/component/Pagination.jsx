import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBySearch, getPosts } from "../actions/posts";
import { useNavigate } from "react-router-dom";
export default function PostPagination({ data, tags, searchQuery, darkMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = async (event, value) => {
    if (tags || searchQuery) {
      navigate(
        `/posts/search?searchQuery=${
          searchQuery || "none"
        }&tags=${tags}&page=${value}`
      );
    } else {
      navigate(`/posts?page=${value}`);
    }
  };
  return (
    <Pagination
      count={data.numberOfpages}
      defaultPage={data.currentPage}
      className={darkMode ? "darkPagination" : ""}
      variant="outlined"
      color={darkMode ? "secondary" : "primary"}
      shape="rounded"
      sx={{
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
      }}
      onChange={handleChange}
    />
  );
}
