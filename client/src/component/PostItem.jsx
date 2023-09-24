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
// import Moment from "react-moment";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import { AiOutlineHeart, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/svg/likeAnimation.json";
import staticData from "../assets/svg/likeAnimationStatic.json";
import { TbEdit } from "react-icons/tb";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../actions/posts";
import { useEffect } from "react";
import { getPosts } from "../actions/posts";
import AddPlaces from "./AddPlaces";
import user from "../assets/test.webp"

export default function PostItem({ postItem, index, }) {
  const [likeStatus, setlikeStatus] = useState(true);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userProfile, setUserProfile] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts);
    setUserProfile(JSON.parse(localStorage.getItem("profile")))
  }, [dispatch]);


  const handleOpen = () => setOpen(!open);

  // ---------------upadte post
  const deletePostItem = async () => {
    try {
      dispatch(deletePost(postItem._id));
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };
  // --------------like post
  const likepostItem = async () => {
    try {
      setlikeStatus((prevState) => !prevState);
      dispatch(likePost(postItem._id));
    } catch (err) {
      console.log(err);
    }
  };

  // checkinf for like status
  const likechecking = () => {
    const liked = postItem.likes.find((like) => like === userProfile.result._id || userProfile.result._googleId )
  } 

  return (
    postItem && (
      <motion.div
        transition={{ delay: 0.1 * index >= 1 ? 1 : 0.1 * index }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {openedMenu && (
          <div
            onClick={() => setOpenedMenu((prevState) => !prevState)}
            className="absolute left-0 cursor-pointer w-full h-full z-30 "
          ></div>
        )}
        <Card className="w-full relative max-w-[270px] shadow-lg mx-auto">
          <AddPlaces updatingPost={edit} post={postItem} />
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
          <CardHeader className="relative" floated={false} color="blue-gray">
            <IoIosMore
              onClick={() => setOpenedMenu((prevStatus) => !prevStatus)}
              className="absolute z-10 top-3 right-[10px] text-[25px] cursor-pointer font-bold"
            />
            <div className="absolute h-full w-full bg-blue-gray-900 opacity-50 "></div>
            <p className="bg-transparent absolute top-2 left-4">
              {moment(postItem.createdAt).fromNow()}
            </p>
            <div className="absolute items-center flex gap-1 bottom-5 left-2">
              <img
                src={user}
                alt={postItem.creator}
                className="w-9 h-9 rounded-full"
              />
              <p className="text-[15px]">{postItem.creator}</p>
            </div>
            {/* <Moment fromNow>{postItem.createdAt?.toDate()}</Moment> */}
            <img src={postItem.selectedFile} alt="ui/ux review check" />
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
          <CardBody className="pb-2">
            <div className="flex items-center justify-between h-16">
              <p className="font-semibold text-ellipsis line-clamp-3">
                #{postItem.tags.join(" #")}
              </p>
              <div className="flex items-center gap-1.5 font-normal">
                <div className="relative w-7 h-7">
                  {likeStatus ? (
                    <AiOutlineHeart
                      onClick={() => likepostItem()}
                      className="text-[27px] ml-[2px] cursor-pointer ease-in-out duration-300  text-[#08764e]"
                    />
                  ) : (
                    //  : postItem.likeCount !== 0 ? (
                    //   <Lottie
                    //     onClick={() => unlikepostItem()}
                    //     loop={false}
                    //     className="text-[25px] -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                    //     animationData={staticData}
                    //   />
                    // )
                    <Lottie
                      onClick={() => likepostItem()}
                      loop={false}
                      className="text-[25px] -top-1 left-0 cursor-pointer scale-[6] w-8 absolute"
                      animationData={animationData}
                    />
                  )}
                </div>
                {postItem.likeCount}
              </div>
            </div>
            <div className="h-[40px]">
              <p className="text-ellipsis line-clamp-2" color="gray ">
                {postItem.message}
              </p>
            </div>
          </CardBody>
          <CardFooter className="pt-1 pb-3">
            <Button size="lg" fullWidth={true}>
              see Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  );
}
