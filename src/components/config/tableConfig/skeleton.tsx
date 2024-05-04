import React from "react";

const TableSkeleton = () => {
  return (
    <div className="">
      <>
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col w-1/5">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col w-1/5">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="h-36 bg-zinc-200  rounded-lg animate-pulse"></div>
        </div>
      </>
    </div>
  );
};

export default TableSkeleton;
