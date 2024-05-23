import React from "react";

const HeaderContentSkeleton = () => {
  return (
    <div className="flex gap-2">
      <div className="h-7 w-32 bg-zinc-200 rounded-lg animate-pulse"></div>
      <div className="h-7 w-16 bg-zinc-200 rounded-lg animate-pulse"></div>
      <div className="h-7 w-16 bg-zinc-200 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default HeaderContentSkeleton;
