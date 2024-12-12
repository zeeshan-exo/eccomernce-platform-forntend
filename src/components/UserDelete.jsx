import React from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

export default function UserDelete({ handlerDeletion }) {
  return (
    <Button onClick={handlerDeletion} className={" text-xl text-red-700"}>
      <MdDelete />
    </Button>
  );
}
