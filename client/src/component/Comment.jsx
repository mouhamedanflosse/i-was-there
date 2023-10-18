import { Avatar, Button, CardBody } from "@material-tailwind/react";
import moment from "moment";
import { useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { DeleteComment } from "../actions/posts";

export default function Comment({
  comment,
  post,
  setComment,
  setUpdating,
  user,
}) {
  const [openDelete, setopenDelete] = useState(false);
  const dispatch = useDispatch();

  //   formating date
  function formatRelativeTime(relativeTime) {
    const momentObj = moment.utc(relativeTime);

    const duration = moment.duration(moment().diff(momentObj));

    if (duration.asYears() >= 1) {
      return Math.floor(duration.asYears()) + "y";
    } else if (duration.asMonths() >= 1) {
      return Math.floor(duration.asMonths()) + "m";
    } else if (duration.asDays() >= 1) {
      return Math.floor(duration.asDays()) + "d";
    } else if (duration.asHours() >= 1) {
      return Math.floor(duration.asHours()) + "h";
    } else if (duration.asMinutes() >= 1) {
      return Math.floor(duration.asMinutes()) + "min";
    } else {
      return "Just now";
    }
  }
  const deletePostComment = (id) => {
    dispatch(DeleteComment(id, post._id));
  };
  const upadete = () => {
    setComment(comment.commentText);
    setUpdating(comment._id);
  };
  return (
    <div className="h-fit relative pl-2">
      <div className="m-0 flex items-center justify-start gap-4 pt-0">
        {comment.selectedFile ? (
          <Avatar
            size="lg"
            className="w-7 h-7"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
        ) : (
          <div className=" flex justify-center outline  outline-2 outline-offset-[2px] outline-gray-900 dark:outline-gray-100 text-white bg-[#008066] font-[540] text-[16px] items-center  relative object-cover object-center rounded-full w-5 h-5 p-0.5">
            {comment.name.charAt(0)}
          </div>
        )}
        <p className="text-black dark:text-[#eee] text-[15px] 2Xsm:text-[13px] ">
          {comment.name}
        </p>
        <p className="text-blue-800 font-semibold  text-[11px] ">
          {formatRelativeTime(comment.createdAt)}
        </p>
        {user?._id === comment.creator && (
          <div className="flex justify-center gap-2 items-center">
            <BiSolidTrashAlt
              onClick={() => setopenDelete(true)}
              className="cursor-pointer"
            />
            <TbEdit
              onClick={() => upadete()}
              className="cursor-pointer text-[16px]"
            />
          </div>
        )}
      </div>
      <CardBody className="mb-1 p-0">
        <p className="text-[14px] mt-1 mb-3  ml-4 dark:text-[#c4bfbf]">
          {comment.commentText}
        </p>
        {/* <hr className="w-[98%] bg-blue-gray-600 opacity-40 h-[1px] mx-2 mt-4"/> */}
      </CardBody>
      {openDelete && (
        <div className="w-full rounded-md py-[1px] items-center  bg-black flex text-[12px] pr-3 justify-between gap-2">
          <span className="text-[10px] text-white ml-3 font-semibold">
            delete comment ?
          </span>
          <div className="flex gap-1">
            <Button
              className="text-[10px] p-[2px]  border-gray-500 text-white"
              variant="outlined"
              onClick={() => setopenDelete(false)}
            >
              cancel
            </Button>
            <Button
              className="text-[10px] p-[2px] bg-gray-600 border-gray-500 text-white"
              variant="outlined"
              onClick={() => deletePostComment(comment._id)}
            >
              confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
