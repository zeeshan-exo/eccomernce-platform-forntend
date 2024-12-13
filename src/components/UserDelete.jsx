import React from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";

export default function UserDelete({ handlerDeletion }) {
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      handlerDeletion();
    }
  };

  return (
    <Button
      onClick={handleDeleteClick}
      className="flex items-center justify-center text-xl text-red-700 hover:text-white hover:bg-red-600 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      <MdDelete />
    </Button>
  );
}
