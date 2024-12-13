import React from "react";
import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
} from "../features/auth/categorySlice";
import { useForm } from "react-hook-form";

const Category = () => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();
  const [createCategory, { isLoading: createLoading, isError: creationError }] =
    useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createCategory({ name: data.name }).unwrap();
      reset();
    } catch (err) {
      console.error("Failed to create category:", err.message);
    }
  };

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

      <ul className="list-disc space-y-2 mb-4">
        {categories?.map((category) => (
          <li key={category._id} className="text-gray-800">
            {category.name}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            {...register("name", {
              required: "Category name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            placeholder="New category name"
            className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={createLoading}
          className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 disabled:bg-gray-300"
        >
          {createLoading ? "Creating..." : "Add Category"}
        </button>
        {creationError && (
          <p className="text-red-600 text-sm mt-2">
            Failed to create category. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Category;
