import React from "react";
import Button from "./Button";

export default function UserUpdate({ handlerUpdate }) {
  return (
    <Button
      onClick={handlerUpdate}
      className={"bg-blue-700 hover:bg-blue-800 text-white"}
    >
      Update
    </Button>
  );
}
