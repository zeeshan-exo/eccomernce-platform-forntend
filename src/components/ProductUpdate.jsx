import React from "react";
import Button from "./Button";
import { IoCreate } from "react-icons/io5";

export default function ProductUpdate({ handlerUpdate }) {
  return (
    <Button onClick={handlerUpdate} className={"text-xl text-black"}>
      <IoCreate />
    </Button>
  );
}
