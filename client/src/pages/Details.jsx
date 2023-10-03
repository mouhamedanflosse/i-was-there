import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/svg/likeAnimation.json";
import staticData from "../assets/svg/likeAnimationStatic.json";
import jwt_decode from "jwt-decode";
import { deletePost, likePost } from "../actions/posts";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export default function Details({ UserProfile }) {
  const [postDet, setPostDet] = useState("");
  const [likeStatus, setlikeStatus] = useState(true);
  const {posts} = useSelector((state) => state.posts);
  const location = useLocation();
  const params = useParams();

  // initializw useNavigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setPostDet(posts.filter((post) => post._id === params.id)[0]);
  }, [location]);


  // checking for like status
  const likechecking = async () => {
    const liked = postDet?.likes?.find(
      (like) => like === UserProfile?.result?._id || UserProfile?.result?.id
    );
    console.log(liked);
    if (liked) {
      console.log("like founded");
      setlikeStatus(null);
    } else {
      console.log("like not founded");
      setlikeStatus(false);
    }
  };

  // --------------like post
  const likepostItem = async (like) => {
    try {
      if (
        !UserProfile ||
        jwt_decode(UserProfile?.token)?.exp * 1000 < new Date().getTime()
      ) {
        navigate("/sign-in");
      } else {
        setlikeStatus(like);
        dispatch(likePost(postDet._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    postDet && (
      <div className="mt-5 flex justify-center ">
        <Card className="w-full max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={postDet.selectedFile}
              alt="post"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              #{postDet.tags.join(" #")}
            </Typography>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              <span className="text-green-500">
                posted {moment(postDet.createdAt).fromNow()}
              </span>
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {postDet.title}
            </Typography>
            <Typography color="gray" className="mb-1 font-normal">
              {postDet.message}
            </Typography>
            <Typography
              variant="h6"
              color="blue"
              className="mb-2 text-light-blue-800 mr-3 text-right"
            >
              {postDet.name}
            </Typography>
            <div className="flex items-center gap-1.5 font-normal">
              <div className="relative w-7 h-7">
                {likeStatus === null ? (
                  <Lottie
                    onClick={() => likepostItem(false)}
                    loop={false}
                    className="text-[25px] -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                    animationData={staticData}
                  />
                ) : likeStatus === false ? (
                  <AiOutlineHeart
                    onClick={() => likepostItem(true)}
                    className="text-[27px] ml-[2px] cursor-pointer ease-in-out duration-300  text-[#08764e]"
                  />
                ) : (
                  <Lottie
                    onClick={() => likepostItem(false)}
                    loop={false}
                    className="text-[25px] -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                    animationData={animationData}
                  />
                )}
              </div>
              {postDet.likes.length}
            </div>
          </CardBody>
        </Card>
      </div>
    )
  );
}
