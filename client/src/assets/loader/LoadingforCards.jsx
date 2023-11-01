import { Skeleton } from "@mui/material";

export default function LoadingforCards() {
  return (
    <div className="flex gap-3 w-[250px] overflow-hidden mb-5">
      <div className=" h-36">
      <Skeleton variant="rectangular"className="dark:bg-blue-gray-500"  width={100} height={164} />
      </div>
      <div className="grow mt-2">
      <Skeleton variant="h3" className="dark:bg-blue-gray-500" sx={{ marginTop: "5px",marginBottom : "3px",width : "100%" }} />
      <Skeleton variant="h1" className="dark:bg-blue-gray-500" sx={{width : "80%",marginBottom : "5px"}} height={10} />

      <Skeleton variant="rounded" className="dark:bg-blue-gray-500" width={210} height={60} />
      <Skeleton variant="rectangular" className="dark:bg-blue-gray-500" sx={{width : "70%",marginBottom : "5px",marginTop : "5px"}} height={30} /> 

      </div>
    </div>
  );
}
