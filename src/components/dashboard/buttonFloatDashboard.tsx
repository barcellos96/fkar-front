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
      className="md:hidden fixed bottom-2 right-2 px-3  z-40 flex items-center justify-center bg-green-500 hover:bg-opacity-60 rounded-md"
    >
      <span className="text-white text-3xl text-center">+</span>
      <PoppoverButtonFloat onPopper={onPopper} />
    </button>
  );
}
