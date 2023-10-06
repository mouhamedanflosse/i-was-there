import React, { useEffect } from "react";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBySearch, getPosts } from "../actions/posts";
import { useNavigate } from "react-router-dom";
export default function PostPagination({data, tags, searchQuery }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = async (data) => {
    if (tags || searchQuery) {
      navigate(
        `/posts/search?searchQuery=${searchQuery || "none"}&tags=${tags}&page=${
          data.target.innerText
        }`
      );
    } else {
      navigate(`/posts?page=${data.target.innerText}`);
    }
  };
  return (
    <Pagination
      count={data.numberOfpages}
      className="paginate"
      variant="outlined"
      color="primary"
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
