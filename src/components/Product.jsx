import React from "react";


const Product = ({ value = { name: "Unknown", company: "Unknown" } }) => {
  return (
    <>
      <div className="product-card p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <h3 className="product-title text-xl font-semibold text-gray-800 mb-4">
          {value.name}
        </h3>

        <p className="description text-gray-600">
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
    </>
  );
};

export default Product;
