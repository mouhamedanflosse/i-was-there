import {
  Avatar,
  CardBody,
} from "@material-tailwind/react";
import moment from "moment";

export default function Comment({comment}) {
  return (
    <div className="h-fit">
      <div
        className="m-0 flex items-center justify-start gap-4 pt-0"
      >
        <Avatar
          size="lg"
          className="w-7 h-7"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="tania andrew"
        />
            <p  className="text-black text-[15px]">
              {comment.name}
            </p>
          <p className="text-blue-800 font-semibold  text-[11px] ">{moment(comment.createdAt).fromNow()}</p>
      </div>
      <CardBody className="mb-1 p-0">
        <p className="text-[14px] ml-12 ">
        {comment.commentText}
        </p>
        {/* <hr className="w-[98%] bg-blue-gray-600 opacity-40 h-[1px] mx-2 mt-4"/> */}
      </CardBody>
    </div>
  );
}
