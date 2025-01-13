import React from "react";
import { useParams } from "react-router-dom";
import elec from "../../assets/electronics.jpeg";
import { useSelector } from "react-redux";
import { useGetOneProductQuery } from "../../features/auth/ProductSlice";
import { useAddToCartMutation } from "../../features/auth/cartSlice";

function ProductDetails({ id }) {
  // const { id } = useParams();
  const { data: product, isLoading, isError } = useGetOneProductQuery(id);

  const [addToCartMutation] = useAddToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);

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
    <div className="p-5 max-w-3xl mx-auto">
      <img
        src={product.image || elec}
        alt={product.name}
        className="w-60 h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-2">${product.price}</p>
      <p className="text-gray-600">{product.details}</p>
      <button
        onClick={() => addToCart(product._id)}
        className="mt-4 bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-950"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
