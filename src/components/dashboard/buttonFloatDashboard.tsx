"use client";

import { useState } from "react";
import PoppoverButtonFloat from "./poppoverButtonFloat";

export default function ButtonFloatDashboard() {
  const [onPopper, setOnPopper] = useState(false);

  const handleOpenPopper = () => {
    setOnPopper((prev) => !prev);
  };

  return (
    <button
      onClick={handleOpenPopper}
      id="btn-float-add"
      className="md:hidden fixed bottom-2 right-2 z-40 flex items-center justify-center bg-green-700 hover:bg-opacity-60 h-16 w-16 *: rounded-full"
    >
      <span className="text-white text-4xl text-center -mt-2">+</span>
      <PoppoverButtonFloat onPopper={onPopper} />
    </button>
  );
}
