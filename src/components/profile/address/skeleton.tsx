import React from "react";

const AddressSkeleton = () => {
  return (
    <div className="">
      <form>
        {/* 1 session */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-semibold text-xl ">Meu Endereço:</h1>
          <div className="flex flex-col w-1/5">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/*2 session */}
        <div className="flex flex-row mb-4 gap-1 h-10">
          <div className="flex flex-col w-full">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* 3 session */}
        <div className="flex flex-row mb-4 gap-1">
          <div className="flex flex-col w-2/3">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col w-1/3">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* 4 session */}
        <div className="flex flex-row mb-4 gap-1">
          <div className="flex flex-col w-1/6">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col  w-2/6">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col w-3/6">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* 5 session */}
        <div className="flex flex-row mb-4 gap-1">
          <div className="flex flex-col w-1/2">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="h-10 bg-zinc-200  rounded-lg animate-pulse"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressSkeleton;
