import React, { useState } from "react";
import { useGetCategoryQuery } from "../../features/auth/categorySlice";
import { useGetSubCategoryQuery } from "../../features/auth/categorySlice";
import SubCategoryList from "./subCategoriesList";

function Categories() {
  const { data: categories, isLoading, error } = useGetCategoryQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    data: subCategories,
    isLoading: subCategoryLoading,
    error: subCategoryError,
  } = useGetSubCategoryQuery(selectedCategoryId, {
    skip: !selectedCategoryId,
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
    setSelectedCategoryId(categoryId);
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
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="block text-lg font-medium text-gray-800 mb-2">
                {category.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {selectedCategoryId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center mb-4">
            Subcategories
          </h3>
          <SubCategoryList
            subCategories={subCategories}
            isLoading={subCategoryLoading}
            error={subCategoryError}
          />
        </div>
      )}
    </div>
  );
}

export default Categories;
