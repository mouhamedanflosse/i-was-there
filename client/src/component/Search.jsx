import { CgSearch } from "react-icons/cg";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");

  //   initialize useNavigate
  const navigate = useNavigate();

  // submit search
  const postSearch = (e) => {
    e?.preventDefault();
    setOpen(false)
    if (tags.trim() || search.trim()) {
      const searchQuery = search.trim();
      navigate(
        `/posts/search?searchQuery=${
          searchQuery || "none"
        }&tags=${tags}&page=1`
      );
    } else {
      navigate("/");
    }
  };

  // search by tags
  const opentags = () => setOpen((prevState) => !prevState);

  return (
    <form
      onSubmit={(e) => postSearch(e)}
      className="mb-4 flex items-center flex-col mdC:flex-row gap-4 flex-wrap"
    >
      <div className="relative w-fit">
        <input
          className="Xxsm:ml-7 bg-transparent w-[230px] dark:text-[#eee] ease-in duration-200 dark:bg-[#1a1e52] border-gray-600  focus:border-black focus:w-[300px]  border-2 outline-none h-10 pl-2 rounded-lg dark:border-gray-600"
          type="text"
          name="query"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-2">
          <CgSearch className="text-[23px] dark:text-gray-600" />
        </button>
      </div>
      <div>
        <Popover open={open} placement="bottom">
          <PopoverHandler onClick={opentags}>
            <Button className="py-1 h-8 dark:bg-[#1a1231] dark:border dark:border-gray-700 dark:text-[#eee] ">
              tags search
            </Button>
          </PopoverHandler>
          <PopoverContent className="max-w-96 z-[100]">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              put comma between two each tag
            </Typography>
            <div className="flex gap-2 text-[#eee]">
              <Input
                label="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className=""
              />
              <button
                onClick={() => postSearch()}
                className=" mt-1 select-none mx-auto dark:bg-[#291d4d] bg-purple-900 border border-gray-300 rounded-lg shadow-md px-3 py-2 text-sm font-medium text-white hover:bg-[#43034a] focus:outline-none"
              >
                search
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
}
