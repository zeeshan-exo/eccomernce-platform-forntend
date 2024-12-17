import React from "react";
import Button from "./Button";
import { IoCreate } from "react-icons/io5";

export default function ProductUpdate({ handlerUpdate }) {
  return (
    <div
      onClick={handlerUpdate}
      className="flex items-center justify-center text-xl text-black-700  "
    >
      <IoCreate />
    </div>
  );
}
