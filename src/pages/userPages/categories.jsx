import React, { useState } from "react";
import { useGetCategoryQuery } from "../../features/auth/categorySlice";
import { useGetSubCategoryQuery } from "../../features/auth/categorySlice";

function Categories() {
  const { data: categories, isLoading, error } = useGetCategoryQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    data: subCategories,
    isLoading: subCategoryLoading,
    error: subCategoryError,
  } = useGetSubCategoryQuery(selectedCategoryId, {
    skip: !selectedCategoryId, // Avoid fetching if no category is selected
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Failed to load categories! Please try again later.
      </div>
    );
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-8 ">Categories</h2>

      {categories?.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No categories available.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <li
              key={category.id}
              className="bg-white hover:bg-blue-100 rounded-lg p-6 shadow-lg text-center transition-transform transform hover:scale-105 cursor-pointer border border-gray-200"
              onClick={() => handleCategoryClick(category.id)} // Add onClick to set selected category
            >
              <span className="block text-lg font-medium text-gray-800 mb-2">
                {category.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Display Subcategories if a category is selected */}
      {selectedCategoryId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center mb-4">
            Subcategories
          </h3>
          {subCategoryLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"></div>
            </div>
          ) : subCategoryError ? (
            <div className="text-center text-red-600">
              Failed to load subcategories!
            </div>
          ) : subCategories?.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No subcategories available.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {subCategories.map((subCategory) => (
                <li
                  key={subCategory.id}
                  className="bg-white hover:bg-blue-100 rounded-lg p-6 shadow-lg text-center transition-transform transform hover:scale-105 cursor-pointer border border-gray-200"
                >
                  <span className="block text-lg font-medium text-gray-800 mb-2">
                    {subCategory.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
