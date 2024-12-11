import React, { useEffect } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";


export default function ProductDelete({ handlerDeletion }) {
  return (
    <Button
      onClick={handlerDeletion}
      className={"bg-red-700 hover:bg-red-800 text-white"}
    >
      <MdDelete/>
    </Button>
  );
}
