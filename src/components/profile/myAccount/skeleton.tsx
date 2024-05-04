import React from "react";

const MyAccountSkeleton = () => {
  return (
    <div className="">
      <form>
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-semibold text-xl ">Minha Conta:</h1>
          <div className="flex flex-col w-1/5">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-row mb-4 gap-1 h-10">
          <div className="flex flex-col w-1/2">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
        </div>
        <div className="flex flex-col mb-6">
          <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
        </div>
      </form>
    </div>
  );
};

export default MyAccountSkeleton;
