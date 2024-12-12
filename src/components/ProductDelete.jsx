import React, { useEffect } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

export default function ProductDelete({ handlerDeletion }) {
  return (
    <Button onClick={handlerDeletion} className={"text-xl text-red-600"}>
      <MdDelete />
    </Button>
  );
}
