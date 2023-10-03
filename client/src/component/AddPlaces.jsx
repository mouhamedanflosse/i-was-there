import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FileBase from "react-file-base64";
import { CreatePost } from "../actions/posts";
import { updatePost } from "../actions/posts";
import { useDispatch } from "react-redux";
import { VscAdd } from "react-icons/vsc";
import { useEffect } from "react";

export default function AddPlaces({ updatingPost, post}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const user = UserProfile.result
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    name : JSON.parse(localStorage.getItem("profile"))?.result?.name,
  });
  const handleOpen = () => setOpen((cur) => !cur);

  const addPost = (e) => {
    e.preventDefault();
    try {
      if (updatingPost) {
        if (!formData.selectedFile) {
          setFormData({ ...formData, selectedFile: post.selectedFile });
        }
        dispatch(updatePost(formData));
      } else {
        dispatch(CreatePost(formData));
        setFormData({
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
        name : JSON.parse(localStorage.getItem("profile"))?.result?.name 
      })
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (updatingPost) {
      handleOpen();
      setFormData({...post,name : JSON.parse(localStorage.getItem("profile"))?.result?.name || JSON.parse(localStorage.getItem("profile")).name });
      // setFormData({...post,name : UserProfile?.name });
    }
  }, [updatingPost]);

  return (
    <div className="relative">
      {!updatingPost && formData.name && (
        <div className="fixed mb-7 z-50 top-[80vh] h-20 mx-auto w-20 right-[30px]  rounded-full">
          <Button
            className="hover:shadow-none shadow-sm relative text-[40px] rounded-full flex items-center w-14 h-14  justify-center hover:bg-[#3b3a3a]"
            onClick={handleOpen}
          >
            <VscAdd className="text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[1px] ml-[1px] text-white absolute" />
          </Button>
        </div>
      )}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent z-[100] shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <p className="text-center m-2 text-[22px]">{updatingPost ? "Edit post" : "Add post"}</p>
          <form onSubmit={addPost}>
            <CardBody className="flex flex-col gap-4">
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                value={formData.title}
                label="title"
                size="lg"
              />
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                value={formData.message}
                label="message"
                size="lg"
              />
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value.split(",") })
                }
                value={formData.tags}
                label="Tags"
                size="lg"
              />
              <div>
                <h1 className="font-bold">upload image</h1>
                <label
                  htmlFor="formFile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <AiOutlineCloudUpload className="text-[40px] text-blue-gray-600" />
                  <FileBase
                    className="mt-1 mr-2 cursor-pointer outline-none w-0 file:hidden rounded-sm"
                    type="file"
                    id="formFile"
                    multiple={false}
                    accept=".jpg,.png,.jpeg,.webp"
                    onDone={(base64) =>
                      setFormData({ ...formData, selectedFile: base64.base64 })
                    }
                    required
                  />
                </label>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                onClick={handleOpen}
                fullWidth
              >
                add
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
