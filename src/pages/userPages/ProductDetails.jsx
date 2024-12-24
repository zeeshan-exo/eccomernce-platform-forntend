import React from "react";
import { useParams } from "react-router-dom";
import { useGetOneProductQuery } from "../../features/auth/ProductSlice";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetOneProductQuery(id);

  if (isLoading) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load product details.
      </div>
    );
  }

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-2">${product.price}</p>
      <p className="text-gray-600">{product.details}</p>
      <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
