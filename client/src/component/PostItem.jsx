import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import { AiOutlineHeart, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/svg/likeAnimation.json";
import staticData from "../assets/svg/likeAnimationStatic.json";
import { TbEdit } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../actions/posts";
import { useEffect } from "react";
import AddPlaces from "./AddPlaces";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
export default function PostItem({ postItem, index, darkMode, posts }) {
  const [likeStatus, setlikeStatus] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [postData, setPostData] = useState();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  // initializw useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile"))?.result);
    setPostData(postItem);
  }, [posts]);

  useEffect(() => {
    if (postData) {
      likechecking(postData);
    }
  }, [postItem, postData]);

  const handleOpen = () => setOpen(!open);

  // ---------------delete post
  const deletePostItem = async () => {
    try {
      handleOpen();
      dispatch(deletePost(postData));
      setOpenedMenu(false);
    } catch (err) {
      console.log(err);
    }
  };
  // --------------like post
  const likepostItem = async (like) => {
    try {
      if (
        !localStorage.getItem("profile") ||
        jwt_decode(JSON.parse(localStorage.getItem("profile"))?.token).exp *
          1000 <
          new Date().getTime()
      ) {
        navigate("/sign-in");
      } else {
        if (likeStatus || likeStatus === null) {
          const postLikes = await postData.likes.filter(
            (id) => id !== userProfile._id
          );
          dispatch(likePost({ ...postData, likes: postLikes }));
        } else {
          dispatch(
            likePost({
              ...postData,
              likes: [...postData.likes, userProfile._id],
            })
          );
        }
        setlikeStatus(like);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // checking for like status
  const likechecking = async (post) => {
    if (!likeStatus) {
      const liked = post.likes.find((id) => id === userProfile?._id);
      if (liked) {
        setlikeStatus(null);
      } else {
        setlikeStatus(false);
      }
    }
  };

  // go to the post details
  const seeDetails = (id) => {
    navigate(`/post/Details/${id}`);
  };
  return (
    postData && (
      <AnimatePresence>
        <motion.div
          key={index}
          transition={{ delay: 0.1 * index >= 1 ? 1 : 0.1 * index }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          // exit={{opacity: 0, scale: 0}}
        >
          {openedMenu && (
            <div
              onClick={() => setOpenedMenu((prevState) => !prevState)}
              className="absolute left-0 cursor-pointer w-full h-full z-30"
            ></div>
          )}
          <div className="relative">
            {typeof postData._id === "number" && (
              <div className="dots absolute mx-auto  z-[31] left-1/2 -translate-x-[50%] top-1/2 -translate-y-[50%]"></div>
            )}
            <div
              className={typeof postData._id === "number" ? `opacity-50` : ""}
            >
              <div className="w-full h-full z-30"></div>
              <Card className="w-full relative Xxsm:max-w-[230px] max-w-[70%] shadow-lg mx-auto dark:bg-[#1a1231]">
                <AddPlaces
                  darkMode={darkMode}
                  updatingPost={edit}
                  setEdit={setEdit}
                  setOpenedMenu={setOpenedMenu}
                  post={postData}
                  UserProfile={userProfile}
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
                      className="bg-red-600 hover:bg-red-900 shadow-none hover:shadow-none flex justify-center items-center gap-2 select-none  p-[12 px] text-white rounded-md"
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
                <CardHeader
                  className="relative mx-auto max-w-[90%] Xxsm:w-[200px]"
                  floated={false}
                  color="blue-gray"
                >
                  {postItem.creator === userProfile?._id && (
                    <IoIosMore
                      onClick={() => setOpenedMenu((prevState) => !prevState)}
                      className="absolute z-10 top-3 right-[10px] text-[25px] cursor-pointer font-bold"
                    />
                  )}
                  <div className="absolute h-full w-full bg-blue-gray-900 opacity-50 "></div>
                  <p className="bg-transparent absolute top-2 left-4">
                    {moment(postData.createdAt).fromNow()}
                  </p>
                  <div className="absolute  items-center flex gap-1 bottom-3 left-2">
                    <div className=" flex justify-center   outline-2 outline-offset-[2px] outline-gray-900 text-white bg-[#008066] font-[540] text-[20px] items-center  relative object-cover object-center rounded-full w-7 h-7 p-0.5">
                      {postData.name.charAt(0)}
                    </div>
                    <p className="text-[14px]">{postData.name}</p>
                  </div>
                  <img
                    src={postData.selectedFile}
                    className=" Xxsm:w-[200px]"
                    alt=""
                  />
                </CardHeader>
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
                <CardBody className="pt-2 pb-2">
                  <div className="flex z-[9] items-center justify-between h-16">
                    <div className="max-h-12 z-[5] max-w-[140px]">
                      <p className="font-semibold text-ellipsis line-clamp-2 dark:text-[#eee]">
                        #{postData.tags.join(" #")}
                      </p>
                    </div>
                    <div className="flex z-[4] items-center gap-1.5 font-normal">
                      <div className="relative  w-7 h-7 ">
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
                            className="text-[25px]   -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                            animationData={animationData}
                          />
                        )}
                      </div>
                      <span className="text-[#08764e] z-[5] font-semibold">
                        {postData.likes.length}
                      </span>
                    </div>
                  </div>
                  <div className="h-[40px] z-[10] ">
                    <p
                      className="text-ellipsis line-clamp-2 dark:text-[#c0bdbd]"
                      color="gray"
                    >
                      {postData.message}
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="pt-1 pb-3 z-[10]">
                  <Button
                    onClick={() => seeDetails(postItem._id)}
                    size="lg"
                    fullWidth={true}
                    className="dark:border dark:border-[#eeeeee5f]"
                  >
                    see Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
}
