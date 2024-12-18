import React from "react";

const Product = ({ value = { name: "Unknown", company: "Unknown" } }) => {
  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="product-card p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="product-title text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          {value.name}
        </h3>

        <p className="description text-gray-600 text-sm sm:text-base">
          <span className="product-properties font-medium text-gray-800">
            Price:{" "}
          </span>
          <span>{value.price}</span>
          <br />

          <span className="product-properties font-medium text-gray-800">
            Company:{" "}
          </span>
          <span>{value.company}</span>
          <br />

          <span className="product-properties font-medium text-gray-800">
            Details:{" "}
          </span>
          <span>{value.details}</span>
        </p>
      </div>
    </div>
  );
};

export default Product;
