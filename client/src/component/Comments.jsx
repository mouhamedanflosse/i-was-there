import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  MenuItem,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import Comment from "./Comment";
 
export default function Comments({open,setOpen}) {
    const [comment,setComment] = useState("")
 
  const handleOpen = () => setOpen(!open) 
  return (
    <>
       <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between pb-0">
          <Typography variant="h5" color="blue-gray">
            Comments
          </Typography>
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
        <DialogBody className="overflow-y-scroll h-96 pr-2">
          <div className="mb-6">
            <div className="mt-1 -ml-2 flex flex-col gap-1">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-center gap-2 py-0 pb-2 border-t border-blue-gray-50">
        <div className="relative pt-3 flex  w-full max-w-[24rem]">
      <Input
        type="email"
        label="Email Address"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="pr-20 mx-auto"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={comment ? "gray" : "blue-gray"}
        disabled={!comment}
        className="!absolute right-1 top-4 rounded"
      >
       add
      </Button>
    </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}