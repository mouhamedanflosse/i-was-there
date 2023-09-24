import {useSelector } from "react-redux";
import AddPlaces from "../component/AddPlaces";
import PostItem from "../component/PostItem";
import { useState } from "react";
import { useEffect } from "react";
export default function Posts() {
const posts = useSelector((state) => state.posts)
const [UserProfile,setUserProfile] = useState()

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, []);
console.log(posts)
  return (
    <div className="mt-6">
      <div className="flex justify-center relative gap-5 flex-wrap">
        {posts.map((postItem,index) => (
          <PostItem key={postItem._id} postItem={postItem} UserProfile={UserProfile} index={index} />
        ))}
      </div>
      <AddPlaces />
    </div>
  );
}
