import { useDispatch, useSelector } from "react-redux";
import AddPlaces from "../component/AddPlaces";
import PostItem from "../component/PostItem";
import { actionType } from "../constants/actionType";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../component/Search";
import PostPagination from "../component/Pagination";
import Loader from "../assets/loader/Loader";

export default function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts);
  console.log(data);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  useEffect(() => {
    if (
      localStorage.getItem("profile") &&
      JSON.parse(localStorage.getItem("profile"))?.exp * 1000 <
        new Date().getTime()
    ) {
      dispatch({ type: actionType.logOut });
    }
  }, [location]);
  const Query = useQuery();
  const page = Query.get("page");
  const searchQuery = Query.get("searchQuery");
  const tags = Query.get("tags");

  return data &&
    <div className="mt-8 relative">
      <Search />
      <div className="flex justify-center relative gap-5 flex-wrap">
        {data.posts?.map((postItem, index) => (
          <PostItem key={postItem._id} postItem={postItem} index={index} />
        ))}
      </div>
      <PostPagination
        data={data}
        page={page}
        searchQuery={searchQuery}
        tags={tags}
      />
      <AddPlaces />
      {/* <Loader /> */}
    </div>
}
