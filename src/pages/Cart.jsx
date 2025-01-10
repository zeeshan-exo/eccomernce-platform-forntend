import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCartQuery,
  useDeleteFromCartMutation,
} from "../features/auth/cartSlice";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import { setCart, updateCartItem } from "../features/auth/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function CartDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id);
  const { data, isLoading, isError } = useGetCartQuery(userId, {
    skip: !userId,
  });
  const [deleteFromCart, { isLoading: deleting, error: deleteError }] =
    useDeleteFromCartMutation();

  useEffect(() => {
    if (data) {
      dispatch(setCart(data));
    }
  }, [data, dispatch]);

  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDeletion = async (productId) => {
    try {
      await deleteFromCart({ userId, productId }).unwrap();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleIncrement = (productId) => {
    dispatch(
      updateCartItem({
        productId,
        change: 1,
      })
    );
  };

  const handleDecrement = (productId) => {
    const item = cart.find((i) => i._id === productId);
    if (item && item.quantity > 1) {
      dispatch(
        updateCartItem({
          productId,
          change: -1,
        })
      );
    }
  };

  const handleCheckout = () => {
    navigate("/home/order");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load cart data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Your Cart</h2>

      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleIncrement(item._id)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  <AiOutlinePlus />
                </button>
                <button
                  onClick={() => handleDecrement(item._id)}
                  className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${
                    item.quantity === 1 && "cursor-not-allowed opacity-50"
                  }`}
                  disabled={item.quantity === 1}
                >
                  <AiOutlineMinus />
                </button>
              </div>
              <span className="font-semibold text-gray-800">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
              <button
                onClick={() => handleDeletion(item._id)}
                disabled={deleting}
                className={`text-xl ${
                  deleting
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {deleting ? "..." : <RxCross2 />}
              </button>
            </div>
          ))}
          <div className="flex justify-between text-xl font-semibold mt-4 border-t pt-4">
            <span>Total:</span>
            <span className="text-teal-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {deleteError && (
        <div className="text-center text-red-600">
          <p>Failed to remove item. Please try again later.</p>
        </div>
      )}

      <div className="flex space-x-4 justify-center mt-6">
        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Checkout
        </button>
        <Link
          to="/home/products"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartDisplay;
