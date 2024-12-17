import React from "react";
import { IoCreate } from "react-icons/io5";

export default function UserUpdate({ handlerUpdate }) {
  return (
    <div
      onClick={handlerUpdate}
      className="flex items-center justify-center text-xl text-black-700  "
    >
      <IoCreate />
    </div>
  );
}
