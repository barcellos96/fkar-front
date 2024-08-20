"use client";

import React from "react";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado

const SkeletonLoader = () => {
  const items = Array.from({ length: 5 }); // Define a quantidade de itens esqueleto

  return (
    <div
      className="ms-2 mt-5 mb-4 max-h-screen rounded-xl shadow-lg pt-5 bg-white"
      style={{ minHeight: "73.6vh", maxHeight: "73.6vh" }}
    >
      <div className="flex flex-col gap-2">
        <section className="flex flex-col ml-5">
          <div className="w-48 h-6 bg-gray-300 rounded animate-pulse mb-1"></div>
          <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
        </section>
      </div>

      <div
        className="px-10 py-3 rounded-xl mt-2 overflow-auto custom-scrollbar"
        style={{ minHeight: "73.6vh", maxHeight: "73.6vh" }}
      >
        <ol className="relative border-s border-zinc-300 text-sm">
          {items.map((_, index) => (
            <li key={index} className={`mb-7 ms-8 cursor-pointer`}>
              <div className="absolute w-8 h-8 bg-gray-300 rounded-full -start-3 ring-8 ring-white animate-pulse"></div>

              <div className="flex flex-wrap items-center mb-1 text-lg font-semibold text-gray-900">
                <div className="w-40 h-6 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="flex mt-4 items-center mb-2 text-base font-normal leading-none text-gray-400">
                <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="flex mb-2 text-base font-normal leading-none text-gray-400">
                <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="flex mb-2 text-base font-normal leading-none text-gray-400">
                <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="flex mb-2 text-lg items-center font-normal leading-none text-red-400">
                <div className="w-20 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SkeletonLoader;
