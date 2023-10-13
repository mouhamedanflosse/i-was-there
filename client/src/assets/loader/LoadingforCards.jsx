import { Skeleton } from "@mui/material";

export default function LoadingforCards() {
  return (
    <div className="flex gap-3 w-[250px] overflow-hidden mb-2">
      <div className="">
      <Skeleton variant="rectangular"  width={100} height={164} />
      </div>
      <div className="grow mt-4">
      <Skeleton variant="h3" sx={{ marginTop: "5px",marginBottom : "3px",width : "100%" }} />
      <Skeleton variant="h1" sx={{width : "80%",marginBottom : "5px"}} height={10} />

      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular"  sx={{width : "70%",marginBottom : "5px",marginTop : "5px"}} height={30} /> 

      </div>
    </div>
  );
}
