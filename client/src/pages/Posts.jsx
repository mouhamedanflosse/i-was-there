import { useSelector } from "react-redux";
import AddPlaces from "../component/AddPlaces";
import PostItem from "../component/PostItem";
export default function Posts() {
  const posts = useSelector((state) => state.posts);

  return (
    <div className="mt-6">
      <div className="flex justify-center relative gap-5 flex-wrap">
        {posts.map((postItem,index) => (
          <PostItem key={postItem._id} postItem={postItem} index={index} />
        ))}
      </div>
      <AddPlaces />
    </div>
  );
}
