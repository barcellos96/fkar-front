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
      className="md:hidden fixed bottom-4 right-10 z-50 flex items-center justify-center bg-green-300 hover:bg-opacity-60 h-16 w-16 *: rounded-full"
    >
      <span className="text-white text-4xl text-center -mt-2">+</span>
      <PoppoverButtonFloat onPopper={onPopper} />
    </button>
  );
}
