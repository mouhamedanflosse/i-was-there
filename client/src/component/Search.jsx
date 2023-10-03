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
import { useDispatch } from "react-redux";
import { getBySearch } from "../actions/posts";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");

  //   initialize useNavigate
  const navigate = useNavigate();

  //   initialize useDispatch
  const dispatch = useDispatch();

  // submit search
  const postSearch = (e) => {
    e?.preventDefault();
    if (search.trim() || tags.trim()) {
      const searchQuery = search.trim();
      navigate(`/posts/search?searchQuery=${searchQuery || "none"}&tags=${tags}&page=1`)
      // dispatch(getBySearch({ search: searchQuery, tags }));
    } else {
      navigate("/");
    }
  };

  // search by
  const opentags = () => setOpen((prevState) => !prevState);
  return (
    <form
      onSubmit={(e) => postSearch(e)}
      className="mb-4 flex items-center flex-col mdC:flex-row gap-4 flex-wrap"
    >
      <div className="relative w-fit">
        <input
          className="ml-7 bg-transparent w-[230px] duration-300 border-gray-600  focus:border-black focus:w-[300px] border-2 outline-none h-10 pl-2 pr-10 rounded-lg dark:text-gray-50 dark:border-gray-600"
          type="text"
          name="query"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-2">
          <CgSearch className="text-[23px]" />
        </button>
      </div>
      <div>
        <Popover open={open} placement="bottom">
          <PopoverHandler onClick={opentags}>
            <Button className="py-1 h-8">tags search</Button>
          </PopoverHandler>
          <PopoverContent className="max-w-96 z-[100]">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              put comma between two each tag
            </Typography>
            <div className="flex gap-2">
              <Input
                label="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button
                onClick={() => postSearch()}
                className=" mt-1 select-none mx-auto bg-purple-900 border border-gray-300 rounded-lg shadow-md px-3 py-2 text-sm font-medium text-white hover:bg-[#43034a] focus:outline-none"
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
