function SubCategoryList({ subCategories, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Failed to load subcategories!
      </div>
    );
  }

  if (subCategories?.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No subcategories available.
      </p>
    );
  }

  return (
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
  );
}

export default SubCategoryList;
