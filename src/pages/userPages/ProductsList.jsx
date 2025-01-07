import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/auth/ProductSlice";
import { useAddToCartMutation } from "../../features/auth/cartSlice";
import { useSelector } from "react-redux";
import laptops from "../../assets/laptops.webp";

function Products() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const [addToCartMutation] = useAddToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);

  const products = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-40 bg-gray-300 animate-pulse"></div>
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10 font-semibold">
        Failed to load products. Please try again later.
      </div>
    );
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      alert("Please log in to add products to the cart.");
      return;
    }

    try {
      await addToCartMutation({ userId, productId, quantity }).unwrap();
      alert("Product added to cart!");
    } catch (err) {
      alert(
        err.data?.message || "Failed to add product to cart. Please try again."
      );
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image || laptops}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-700">
                  {product.name}
                </h2>
                <p className="text-gray-500 mt-2 text-sm">${product.price}</p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {product.details}
                </p>
              </div>
              <div className="p-4 flex justify-between items-center">
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product._id}`}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No products available
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
