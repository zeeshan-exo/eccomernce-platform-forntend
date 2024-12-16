import React, { useState } from "react";
import {
  useGetSubCategoryQuery,
  useCreateSubCategoryMutation,
} from "../features/auth/categorySlice";
import ReusableForm from "../components/Reuseableform";
import ReusableTable from "../components/Table";

const Subcategory = () => {
  const {
    data: subcategories,
    isLoading,
    isError,
    error,
  } = useGetSubCategoryQuery();

  const [
    createSubCategory,
    { isLoading: createLoading, isError: creationError },
  ] = useCreateSubCategoryMutation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Subcategory name",
      required: true,
    },
  ];

  const tableColumns = [{ label: "Name", accessor: "name" }];

  const handleFormSubmit = async (formData) => {
    try {
      await createSubCategory({ name: formData.name }).unwrap();
      setIsDrawerOpen(false);
    } catch (error) {
      console.log(error);
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
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg relative">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-3xl font-bold text-teal-700">Subcategories</h2> */}
        <button
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-300 px-4 py-2 rounded-md shadow-md"
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Subcategory
        </button>
      </div>

      <ReusableTable
        columns={tableColumns}
        data={subcategories || []}
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

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <div className="w-96 h-full bg-white p-6 shadow-2xl transform transition-transform translate-x-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-teal-700">
                Add Subcategory
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
              onSubmit={handleFormSubmit}
              onCancel={() => setIsDrawerOpen(false)}
              submitLabel={createLoading ? "Creating..." : "Add Subcategory"}
              isLoading={createLoading}
            />

            {creationError && (
              <p className="text-red-600 text-sm mt-4">
                Failed to create subcategory. Please try again.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subcategory;
