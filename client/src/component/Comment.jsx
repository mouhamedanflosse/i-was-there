import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";

export default function Comment() {
  return (
    <div className="h-fit">
      <div
        // color="transparent"
        // floated={false}
        // shadow={false}
        className="m-0 flex items-center justify-start gap-4 pt-0"
      >
        <Avatar
          size="lg"
          className="w-7 h-7"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="tania andrew"
        />
        {/* <div className="flex w-full flex-col gap-0.5"> */}
          {/* <div className="flex items-center justify-between"> */}
            <p  className="text-black text-[17px]">
              Tania Andrew
            </p>
          {/* </div> */}
        {/* </div> */}
          <p className="to-blue-gray-300 font-semibold  text-[12px] ">Feb. 12, 2022</p>
      </div>
      <CardBody className="mb-6 p-0">
        <p className="text-[14px] ml-9 ">
        I found solution to all my design needs from Creative Tim. I use
          them as a freelancer
        </p>
      </CardBody>
    </div>
  );
}
