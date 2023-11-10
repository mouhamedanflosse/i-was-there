import { useDispatch, useSelector } from "react-redux";
import AddPlaces from "../component/AddPlaces";
import PostItem from "../component/PostItem";
import { actionType } from "../constants/actionType";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../component/Search";
import PostPagination from "../component/Pagination";
import { getBySearch, getPosts } from "../actions/posts";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export default function Home({ darkMode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState(data?.posts);

  const useQeury = () => {
    return new URLSearchParams(location.search);
  };

  const Query = useQeury();
  const page = Query.get("page");
  const searchQuery = Query.get("searchQuery");
  const tags = Query.get("tags");

  useEffect(() => {
    if (searchQuery || tags) {
      dispatch(getBySearch({ searchQuery, tags, page }));
    } else {
      dispatch(getPosts(page));
    }
    if (
      localStorage.getItem("profile") &&
      jwt_decode(JSON.parse(localStorage.getItem("profile"))?.token).exp *
        1000 <
        new Date().getTime()
    ) {
      dispatch({ type: actionType.logOut });
    }
  }, [location, searchQuery, tags, page]);

  useEffect(() => {
    setPosts(data.posts);
  }, [data]);
  return (
    <div className="mt-8 relative ">
      <Search />
      {posts && !loading ? (
        <>
          <div className="flex justify-center relative gap-5 flex-wrap">
            {posts.map((postItem, index) => (
              <PostItem
                posts={posts}
                key={postItem._id}
                postItem={postItem}
                darkMode={darkMode}
                index={index}
              />
            ))}
          </div>
          {posts && (
            <PostPagination
              data={data}
              darkMode={darkMode}
              searchQuery={searchQuery}
              tags={tags}
            />
          )}
        </>
      ) : (
        <div className="bars mx-auto mt-40 "></div>
      )}
      <AddPlaces
        data={true}
        setPosts={setPosts}
        darkMode={darkMode}
      />
    </div>
  );
}
