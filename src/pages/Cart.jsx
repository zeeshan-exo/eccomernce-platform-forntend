import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../features/auth/cartSlice";
import { setCart } from "../features/auth/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function CartDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user?._id);

  const { data, isLoading, isError, error } = useGetCartQuery(userId, {
    skip: !userId,
  });

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (data) {
      dispatch(setCart(data));
    }
  }, [data, dispatch]);

  const totalPrice = cart.reduce(
    (sum, data) => sum + data.price * data.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div class="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div class="h-40 bg-gray-300 animate-pulse"></div>
        <div class="p-4 space-y-4">
          <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">
          Failed to load cart data. Please try again later.
        </p>
        <p className="text-gray-500">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2
        role="heading"
        aria-level="2"
        className="text-3xl font-semibold text-gray-800"
      >
        Cart Items
      </h2>

      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-4 border-b border-gray-300"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <span className="text-gray-800 font-semibold">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in the cart.</p>
      )}

      <div className="space-x-4 flex justify-center">
        <button
          onClick={handleCheckout}
          className="w-48 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
        >
          Proceed to Checkout
        </button>
        <Link
          to="/home/products"
          className="w-48 py-3 bg-indigo-600 text-center text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartDisplay;
