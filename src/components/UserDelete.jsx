import React from "react";
import Button from "./Button";

export default function UserDelete({ handlerDeletion }) {
  return (
    <Button
      onClick={handlerDeletion}
      className={"bg-red-600 hover:bg-red-800 text-white"}
    >
      Delete
    </Button>
  );
}
