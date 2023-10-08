import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function HorizontalCard({ post }) {
  const navigate = useNavigate();

  const seeDetails = (id) => {
    navigate(`/post/Details/${id}`);
  };
  return (
    <Card className="w-full mx-2 max-w-[250px] grow flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={post.selectedFile}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-2  w-[140px]">
        <div className="max-h-[33px]">
          <p className="mb-1 text-ellipsis w-full text-[12px] line-clamp-2 uppercase">
            #{post.tags.join(" #")}
          </p>
        </div>
        <div className="max-h-10">
          <p className="mb-1 text-ellipsis text-gray-600 font-semibold  line-clamp-2 text-[13px]">
            {post.title}
          </p>
        </div>
        <div className="max-h-[54px]">
          <p className="mb-1 font-normal text-ellipsis line-clamp-2 text-[12px]">
            {post.message}
          </p>
        </div>
        <Button onClick={() => seeDetails(post._id)} size="sm" fullWidth={true}>
          see Details
        </Button>
      </CardBody>
    </Card>
  );
}
