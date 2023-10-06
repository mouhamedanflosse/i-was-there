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
import { useLocation, useNavigate } from "react-router-dom";

export default function PostItem({ postItem, index }) {
  const [likeStatus, setlikeStatus] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  // initializw useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    likechecking();
  }, [location]);

  const handleOpen = () => setOpen(!open);

  // ---------------upadte post

  const deletePostItem = async () => {
    try {
      dispatch(deletePost(postItem._id));
      handleOpen();
      setOpenedMenu(false)
    } catch (err) {
      console.log(err);
    }
  };

  // --------------like post
  const likepostItem = async (like) => {
    try {
      dispatch(likePost(postItem._id));
      if (
        !localStorage.getItem("profile") ||
        jwt_decode(JSON.parse(localStorage.getItem("profile"))?.token)?.exp *
          1000 <
          new Date().getTime()
      ) {
        navigate("/sign-in");
      } else {
        setlikeStatus(like);
        dispatch(likePost(postItem._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  // checking for like status
  const likechecking = async () => {
    const liked = postItem.likes.find(
      (like) =>
        like === JSON.parse(localStorage.getItem("profile"))?.result?._id ||
        JSON.parse(localStorage.getItem("profile"))?.result?.id
    );

    if (liked) {
      setlikeStatus(null);
    } else {
      setlikeStatus(false);
    }
  };
  const seeDetails = (id) => {
    navigate(`/post/Details/${id}`)
  }
  return (
    postItem && (
      <AnimatePresence>
      <motion.div
        key={index}
        transition={{ delay: 0.1 * index >= 1 ? 1 : 0.1 * index}}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        // exit={{opacity: 0, scale: 0}}
      >
        {openedMenu && (
          <div
            onClick={() => setOpenedMenu((prevState) => !prevState)}
            className="absolute left-0 cursor-pointer w-full h-full z-30 "
          ></div>
        )}
        <Card className="w-full relative max-w-[230px] shadow-lg mx-auto">
          <AddPlaces
            updatingPost={edit}
            setEdit={setEdit}
            setOpenedMenu={setOpenedMenu}
            post={postItem}
            UserProfile={userProfile}
          />
          <Dialog open={open} size="xs" handler={handleOpen}>
            <DialogHeader>sure you want to delete this post</DialogHeader>
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
          <CardHeader
            className="relative w-[200px]"
            floated={false}
            color="blue-gray"
          >
            {postItem.creator === userProfile?.result?._id && (
              <IoIosMore
                onClick={() => setOpenedMenu((prevState) => !prevState) }
                className="absolute z-10 top-3 right-[10px] text-[25px] cursor-pointer font-bold"
              />
            )}
            <div className="absolute h-full w-full bg-blue-gray-900 opacity-50 "></div>
            <p className="bg-transparent absolute top-2 left-4">
              {moment(postItem.createdAt).fromNow()}
            </p>
            <div className="absolute items-center flex gap-1 bottom-3 left-2">
              <div className=" flex justify-center   outline-2 outline-offset-[2px] outline-gray-900 text-white bg-[#008066] font-[540] text-[20px] items-center  relative object-cover object-center rounded-full w-7 h-7 p-0.5">
                {postItem.name.charAt(0)}
              </div>
              <p className="text-[14px]">{postItem.name}</p>
            </div>
            <img src={postItem.selectedFile} className="w-[200px]" alt="" />
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
            <div className="flex items-center justify-between h-16">
              <p className="font-semibold text-ellipsis line-clamp-3">
                #{postItem.tags.join(" #")}
              </p>
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
                {postItem.likes.length}
              </div>
            </div>
            <div className="h-[40px]">
              <p className="text-ellipsis line-clamp-2" color="gray ">
                {postItem.message}
              </p>
            </div>
          </CardBody>
          <CardFooter className="pt-1 pb-3">
            <Button onClick={() => seeDetails(postItem._id)} size="lg" fullWidth={true}>
              see Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      </AnimatePresence>
    )
  );
}
