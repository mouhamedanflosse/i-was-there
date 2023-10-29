import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogFooter,
  DialogHeader,
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
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneDelete,
} from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../component/Comments";
import MorePosts from "../component/MorePosts";
import LoadingforCards from "../assets/loader/LoadingforCards";
import { toast } from "react-hot-toast";
import { IoIosMore } from "react-icons/io";
import { motion } from "framer-motion";
import { TbEdit } from "react-icons/tb";
import AddPlaces from "../component/AddPlaces";

export default function Details({ UserProfile, darkMode }) {
  const [likeStatus, setlikeStatus] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const params = useParams();
  const [postData, setPostData] = useState();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  // console.log(location.pathname);
  const [openedMenu, setOpenedMenu] = useState(false);
  // initialize useNavigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsById(params.id));
    setPostData(post);
  }, [location]);

  const handleOpen = () => setOpen(!open);

  const deletePostItem = async () => {
    try {
      handleOpen();
      setOpenedMenu(false);
      await dispatch(deletePost(post._id));
      setTimeout(() => {
        navigate("/");
        setTimeout(() => {
          toast.success("post deleted");
        }, 1000);
      }, 1000);
    } catch (err) {
      toast.success(err.response.data.error.message);
    }
  };
  // ------------copy link
  async function copyLink() {
    toast.promise(
      new Promise(async (resolve, reject) => {
        setTimeout(() => {
          try {
            navigator.clipboard.writeText(window.location.href);
            resolve();
          } catch (err) {
            console.log(err);
            reject();
          }
        }, 1500);
      }),
      {
        loading: "copying...",
        success: <b>copied</b>,
        error: <b>Could not copy the link</b>,
      }
    );
  }

  useEffect(() => {
    if (post && likeStatus === null && !loading) {
      setTimeout(() => {
        likechecking(post);
      }, 200);
    }
  }, [post]);

  // checking for like status
  const likechecking = async (post) => {
    const liked = await post.likes.find(
      (like) => like === UserProfile?.result?._id
    );
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
        if (likeStatus) {
          const postLikes = await postData.likes.filter((id) => id !== UserProfile.result._id )
          console.log(postLikes);
          setPostData({ ...postData, likes: postLikes });
        } else {
          setPostData({
            ...postData,
            likes: [...postData.likes, UserProfile.result._id],
          });
          console.log(postData)
        }
        setlikeStatus(like);
        dispatch(likePost(post._id, "single"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    postData && (
      <div className="mt-5 flex justify-center items-center gap-[26px] flex-wrap">
        <Comments
          open={openComments}
          setOpen={setOpenComments}
          darkMode
          post={post}
        />
        {openedMenu && (
          <div
            onClick={() => setOpenedMenu((prevState) => !prevState)}
            className="absolute left-0 cursor-pointer top-0 w-full h-full z-30"
          ></div>
        )}
        <AddPlaces
          darkMode={darkMode}
          path={location.pathname}
          updatingPost={edit}
          setEdit={setEdit}
          setOpenedMenu={setOpenedMenu}
          post={post}
          UserProfile={UserProfile}
        />
        <Dialog
          className="dark:bg-[#1a2227]"
          open={open}
          size="xs"
          handler={handleOpen}
        >
          <DialogHeader className="dark:text-[#dad4d4]">
            sure you want to delete this post
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="text"
              onClick={handleOpen}
              className="mr-1 hover:bg-blue-gray-50"
            >
              <span className="text-gray-700">Cancel</span>
            </Button>
            <Button
              onClick={() => deletePostItem()}
              className="bg-red-600 hover:bg-red-900 shadow-none hover:shadow-none flex justify-center items-center gap-2 select-none  p-[12 px] text-white rounded-md "
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Card className="w-full grow  max-w-[48rem] m-4 flex-row flex-wrap dark:bg-[#1a1231]">
          <CardHeader
            shadow={false}
            floated={false}
            className="Xsmd:m-0 mt-6 shadow-md shadow-black self-stretch w-64 Xsmd:shadow-none mx-auto shrink-0  Xsmd:rounded-r-none rounded-[15px}"
          >
            <img
              src={postData.selectedFile}
              alt="post"
              className="h-full w-full object-fill"
            />
          </CardHeader>
          <CardBody className="grow relative w-80">
            <Typography
              variant="h6"
              color={darkMode ? "blue-gray" : "gray"}
              className="mb-4 uppercase dark:text-[#c6c2c2]"
            >
              #{postData.tags.join(" #")}
            </Typography>
            {postData.creator === UserProfile?.result?._id && (
              <IoIosMore
                onClick={() => setOpenedMenu((prevState) => !prevState)}
                className="absolute mt-3 z-10 top-3 right-[10px] text-[25px] cursor-pointer font-bold"
              />
            )}
            {openedMenu && (
              <motion.div
                animate={{ opacity: [0, 1], y: [20, 0] }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="w-36 right-5 top-14 z-40 text-gray-900 bg-white absolute border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <button
                  type="button"
                  onClick={() => setEdit((prevState) => !prevState)}
                  className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 duration-300 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <TbEdit />
                  edit
                </button>
                <button
                  onClick={handleOpen}
                  type="button"
                  className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b duration-300 border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <AiTwotoneDelete />
                  Delete
                </button>
              </motion.div>
            )}
            <Typography variant="h6" className="mb-4 uppercase">
              <span className="text-green-500">
                posted {moment(postData.createdAt).fromNow()}
              </span>
            </Typography>
            <Typography
              variant="h4"
              color={darkMode ? "gray" : "blue-gray"}
              className="mb-2  dark:text-[#c6c2c2]"
            >
              {postData.title}
            </Typography>
            <Typography
              color={darkMode ? "blue-gray" : "gray"}
              className="mb-1 font-normal dark:text-[#a9a5a5]"
            >
              {postData.message}
            </Typography>
            <Typography
              variant="h6"
              color="blue"
              className="mb-2 text-light-blue-800 mr-3 text-right"
            >
              {postData.name}
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
                <span className="text-[#08764e]">{postData.likes.length}</span>
              </div>
              <AiOutlineComment
                onClick={() => setOpenComments(true)}
                className="text-[28px] cursor-pointer z-10 dark:text-[#b0adad]"
              />
              <FaRegShareSquare
                onClick={() => copyLink()}
                className="text-[25px] ml-1 cursor-pointer dark:text-[#b0adad]"
              />
            </div>
          </CardBody>
        </Card>
        <div className="bg-white grow w-[250px] dark:bg-[#1a1231] h-96 overflow-y-auto noScrollBar">
          <Typography
            variant="h6"
            color={darkMode ? "blue-gray" : "gray"}
            className="mb-4 text-center mt-2 dark:text-[#eee] uppercase"
          >
            you might also like :
          </Typography>
          <div className="flex justify-center relative overflow-hidden flex-wrap gap-4 ">
            {postData ? <MorePosts post={post} /> : <LoadingforCards />}
          </div>
        </div>
      </div>
    )
  );
}
