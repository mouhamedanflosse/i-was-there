import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import Comment from "./Comment";
import { createComment } from "../actions/posts";
import { useDispatch } from "react-redux";
import { updateComment } from "../actions/posts";
import { useRef } from "react";

export default function Comments({ open, setOpen, post, darkMode }) {
  const [comment, setComment] = useState("");
  const [postData, setPostData] = useState("");
  const [user, setUser] = useState();
  const [upadating, setUpdating] = useState();

  const commentRef = useRef();

  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();

  useEffect(() => {
    setPostData(post);
    setUser(JSON.parse(localStorage.getItem("profile"))?.result);
  }, [localStorage.getItem("profile"), post]);

  //   add comment
  const addComment = async (e) => {
    e.preventDefault();
    // upadte comment
    if (upadating) {
      const comments = await postData.comments.map((cmt) =>
        cmt._id === upadating ? { ...cmt, commentText: comment } : cmt
      );
      await setPostData({ ...postData, comments });
      dispatch(
        updateComment(upadating, { postId: post._id, commentText: comment },postData)
      );
    } else {
      // create new comment
      await setPostData({
        ...postData,
        comments: [
          ...postData.comments,
          {
            creator: user._id || user.id,
            name: user.name,
            picture: user.picture || "",
            commentText: comment,
            selectedFile: user.picture || null,
            createdAt: new Date().toISOString(),
            _id: Math.random() * 1000,
          },
        ],
      });
      const commentText = comment;
      cancelEditing()
      await dispatch(
        createComment({
          comment: {
            creator: user._id || user.id,
            name: user.name,
            picture: user.picture || "",
            commentText: commentText,
            selectedFile: user.picture || null,
          },
          id: post._id,
        }, postData )
      );
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
    cancelEditing()
  };

  const cancelEditing = () => {
    setUpdating(null);
    setComment("");
  };

  return (
    postData && (
      <>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="Xsm:min-w-[320px] dark:bg-[#1a2227] Xsm:max-w-[320px] md:max-w-[320px] md:min-w-[320px] lg:min-w-[320px] lg:max-w-[320px] 2xl:min-w-[320px] 2xl:max-w-[320px]  min-w-[320px] max-w-[320px]"
        >
          <DialogHeader className="justify-between pb-0">
            <p className="block dark:text-[#eee] antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
              Comments
            </p>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody className="overflow-y-scroll noScrollBar h-96 pr-2">
            <div className="mb-6">
              <div className="mt-1 -ml-2 flex flex-col gap-1">
                {postData.comments.map((comment, index) => (
                  <Comment
                    key={Math.random() * 1000}
                    post={postData}
                    setUpdating={setUpdating}
                    setPostData={setPostData}
                    setComment={setComment}
                    comment={comment}
                    user={user}
                  />
                ))}
              </div>
              <div ref={commentRef}></div>
            </div>
          </DialogBody>
          <DialogFooter className="justify-center gap-2 py-0 pb-2">
            {user ? (
              <form
                onSubmit={(e) => addComment(e)}
                className="relative pt-3 flex  w-full max-w-[24rem]"
              >
                <Input
                  type="text"
                  label="write comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="pr-20 dark:text-[#eee] mx-auto"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  color={darkMode ? "blue-gray" : ""}
                />
                <Button
                  size="sm"
                  onClick={addComment}
                  color={comment ? "gray" : "blue-gray"}
                  disabled={!comment}
                  className="!absolute right-1 px-5 top-4 rounded"
                >
                  add
                </Button>
                {upadating && (
                  <Button
                    size="sm"
                    type="button"
                    onClick={cancelEditing}
                    color={comment ? "gray" : "blue-gray"}
                    className="!absolute right-1 px-2 py-[7px] hover:shadow-none  hover:text-red-300 bg-transparent border-[1px] border-red-600 text-red-700 -top-6 rounded"
                  >
                    cancel
                  </Button>
                )}
              </form>
            ) : (
              "please sign in if want to add comment "
            )}
          </DialogFooter>
        </Dialog>
      </>
    )
  );
}
