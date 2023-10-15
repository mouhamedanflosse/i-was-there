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
import { deletePost, getPostsById, likePost } from "../actions/posts";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../component/Comments";
import MorePosts from "../component/MorePosts";
import LoadingforCards from "../assets/loader/LoadingforCards";

export default function Details({ UserProfile, darkMode }) {
  const [likeStatus, setlikeStatus] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const data = useSelector((state) => state.posts);
  const params = useParams();

  const location = useLocation();

  // initializw useNavigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  //   console.log(post);
  useEffect(() => {
    // setUserProfile(JSON.parse(localStorage.getItem("profile")));
    const loadingPostDet = async () => {
      await dispatch(getPostsById(params.id));
      if (post) {
        console.log("success 1");
        console.log(post);
        likechecking();
      }
    };
    loadingPostDet();
  }, [location]);
  // checking for like status
  const likechecking = async () => {
    const liked = await post.likes.find(
      (like) => like === UserProfile?.result?._id || UserProfile?.result?.id
    );
    console.log(liked);
    if (liked) {
      setlikeStatus(null);
    } else {
      setlikeStatus(false);
    }
  };
  // --------------like post
  const likepostItem = async (like) => {
    try {
      if (
        !localStorage.getItem("profile") ||
        jwt_decode(JSON.parse(localStorage.getItem("profile"))?.token)?.exp *
          1000 <
          new Date().getTime()
      ) {
        navigate("/sign-in");
      } else {
        setlikeStatus(like);
        dispatch(likePost(post._id, "single"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    post && (
      <div className="mt-5 flex justify-center items-center gap-[26px] flex-wrap">
        <Comments open={openComments} setOpen={setOpenComments} post={post} />
        <Card className="w-full grow  max-w-[48rem] m-4 flex-row flex-wrap dark:bg-[#1a1231]">
          <CardHeader
            shadow={false}
            floated={false}
            className="Xsmd:m-0 mt-6 shadow-md shadow-black self-stretch w-64 Xsmd:shadow-none mx-auto shrink-0  Xsmd:rounded-r-none rounded-[15px}"
          >
            <img
              src={post.selectedFile}
              alt="post"
              className="h-full w-full object-fill"
            />
          </CardHeader>
          <CardBody className="grow w-80">
            <Typography
              variant="h6"
              color={darkMode ? "" : "gray"}
              className="mb-4 uppercase dark:text-[#c6c2c2]"
            >
              #{post.tags.join(" #")}
            </Typography>
            <Typography variant="h6" className="mb-4 uppercase">
              <span className="text-green-500">
                posted {moment(post.createdAt).fromNow()}
              </span>
            </Typography>
            <Typography
              variant="h4"
              color={darkMode ? "" : "blue-gray"}
              className="mb-2  dark:text-[#c6c2c2]"
            >
              {post.title}
            </Typography>
            <Typography
              color={darkMode ? "" : "gray"}
              className="mb-1 font-normal dark:text-[#a9a5a5]"
            >
              {post.message}
            </Typography>
            <Typography
              variant="h6"
              color="blue"
              className="mb-2 text-light-blue-800 mr-3 text-right"
            >
              {post.name}
            </Typography>
            <div className="flex items-center gap-5">
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
                      className="text-[25px]  -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                      animationData={animationData}
                    />
                  )}
                </div>
                <span className="text-[#08764e]">{post.likes.length}</span>
              </div>
              <AiOutlineComment
                onClick={() => setOpenComments(true)}
                className="text-[28px] cursor-pointer z-10 dark:text-[#b0adad]"
              />
              <FaRegShareSquare className="text-[25px] ml-1 cursor-pointer dark:text-[#b0adad]" />
            </div>
          </CardBody>
        </Card>
        <div className="bg-white grow w-[250px] dark:bg-[#1a1231] h-96 overflow-y-auto">
          <Typography
            variant="h6"
            color={darkMode ? "" : "gray"}
            className="mb-4 text-center mt-2 dark:text-[#eee] uppercase"
          >
            you might also like :
          </Typography>
          {post && (
            <div className="flex justify-center relative overflow-hidden flex-wrap gap-4 ">
              <MorePosts post={post} />
            </div>
          )}
        </div>
        {/* <LoadingforCards /> */}
      </div>
    )
  );
}
