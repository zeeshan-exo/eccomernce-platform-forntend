import React from "react";
import { useGetCategoryQuery } from "../features/auth/categorySlice";

const Category = () => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-8">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 mt-8">
        Error: {error?.data?.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Categories
      </h2>
      <ul className="list-disc space-y-2">
        {categories?.map((category) => (
          <li key={category._id} className="text-gray-800">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
