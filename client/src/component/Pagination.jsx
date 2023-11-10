import { Pagination } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostPagination({ data, tags, searchQuery, darkMode }) {
  const navigate = useNavigate();
  const [currentPage,setCurrentPage] = useState(data.currentPage)
  const [numberOfpages,setNumberOfpages] = useState(data.numberOfpages)
  const [ready,setReady] = useState(false)

  useEffect(() => {
    setCurrentPage(data.currentPage)
    setNumberOfpages(data.numberOfpages)
  },[data])

  useEffect(() => {
    setTimeout(() => {
        setReady(true)
    }, 300);
  },[])

  const handleChange = async (event, value) => {
    if (tags || searchQuery) {
     await setCurrentPage(value)
        navigate(
          `/posts/search?searchQuery=${
            searchQuery || "none"
          }&tags=${tags}&page=${value}`
        );
    } else {
   await setCurrentPage(value)
    navigate(`/posts?page=${value}`);
    }
  };
  return (
    ready &&
    <Pagination
      count={numberOfpages}
      page={currentPage}
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
