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
    <Card shadow={false} className=" ">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="m-0 mt-6 flex items-center gap-4 pt-0"
      >
        <Avatar
          size="lg"
          className="w-9 h-9"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="tania andrew"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
          </div>
          <Typography color="blue-gray">Feb. 12, 2022</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>
          &quot;I found solution to all my design needs from Creative Tim. I use
          them as a freelancer
        </Typography>
      </CardBody>
    </Card>
  );
}
