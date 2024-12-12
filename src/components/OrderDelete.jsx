import React, { useEffect } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

export default function OrderDelete({ handleDeletion }) {
  return (
    <Button onClick={handleDeletion} className={"text-xl text-red-700"}>
      <MdDelete />
    </Button>
  );
}
