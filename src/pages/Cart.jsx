import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../features/auth/cartSlice";
import { setCart } from "../features/auth/cartSlice";
import { Link } from "react-router-dom";

function CartDisplay() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?._id);

  const { data, isLoading, isError, error } = useGetCartQuery(userId, {
    skip: !userId,
  });

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (data) {
      console.log("Cart Data:", data);
      dispatch(setCart(data));
    }
  }, [data, dispatch]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return <p className="text-center">Loading cart items...</p>;
  }

  if (isError) {
    console.error("Error loading cart:", error);
    return (
      <p className="text-red-600 text-center">
        Failed to load cart data. Please try again later.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-lg flex-col  bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="mb-4 flex justify-between">
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)} = $$
                {(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
        </div>
      ) : (
        <p className="text-center m-4">No items in the cart.</p>
      )}
      <button className="rounded-md m-4 py-2 px-2 bg-green-800 text text-white">
        Proceed to Checkout
      </button>
      <Link
        to="/home/products"
        className="rounded-md px-2 py-2 bg-indigo-800 text text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default CartDisplay;
