"use client";
import { useState } from "react";

export default function ToggleButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-all ${
        toggle ? "bg-blue-600" : "bg-gray-300"
      }`}
      onClick={() => setToggle(!toggle)}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          toggle ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );
}
