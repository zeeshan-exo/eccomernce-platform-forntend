import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center">
      <div className="p-10 ">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <Link to={"/admin/dashboard"}>
          <button className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold uppercase border-solid p-4">
            go back
          </button>
        </Link>
      </div>
    </div>
  );
}
