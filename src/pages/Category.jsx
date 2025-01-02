import React, { useState } from "react";
import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
} from "../features/auth/categorySlice";
import ReusableForm from "../components/Form";
import ReusableTable from "../components/Table";
import { useForm } from "react-hook-form";

const Category = () => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();
  const [createCategory, { isLoading: createLoading, isError: creationError }] =
    useCreateCategoryMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
    },
  ];

  const tableColumns = [{ label: "Name", accessor: "name" }];

  const handleFormSubmit = async (formData) => {
    try {
      await createCategory({ name: formData.name }).unwrap();
      setIsDrawerOpen(false);
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
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg relative">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-300 py-2 px-5 rounded-lg shadow-md transform hover:scale-105"
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Category
        </button>
      </div>

      <div className="overflow-hidden  border border-gray-200 shadow-md">
        <ReusableTable
          columns={tableColumns}
          data={categories || []}
          renderActions={(item) => (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition"
                onClick={() => console.log("Edit", item._id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition"
                onClick={() => console.log("Delete", item._id)}
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <div className="w-96 h-full bg-white p-6 shadow-2xl transform transition-transform duration-300 translate-x-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Add Category
              </h3>
              <button
                className="text-gray-600 hover:text-red-600 transition"
                onClick={() => setIsDrawerOpen(false)}
              >
                <span className="text-3xl">&times;</span>
              </button>
            </div>

            <ReusableForm
              fields={formFields}
              initialValues={{ name: "" }}
              onSubmit={handleSubmit(handleFormSubmit)}
              onCancel={() => setIsDrawerOpen(false)}
              submitLabel={createLoading ? "Creating..." : "Add Category"}
              isLoading={createLoading}
              control={control}
            />

            {creationError && (
              <p className="text-red-600 text-sm mt-4">
                Failed to create category. Please try again.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
