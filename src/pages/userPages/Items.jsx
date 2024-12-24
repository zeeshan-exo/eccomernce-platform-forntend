import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/auth/ProductSlice";

function Products() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const products = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md shadow-md overflow-hidden"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {product.details}
                </p>
              </div>
              <div className="p-4 flex justify-between items-center">
                <button className="bg-rgb(77, 161, 169) text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No products available</div>
        )}
      </div>
    </div>
  );
}

export default Products;
