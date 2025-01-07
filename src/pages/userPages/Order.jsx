import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../../features/auth/OrderSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  contact: Yup.string().required("Phone number is required"),
  shippingAddress: Yup.string()
    .required("Shipping address is required")
    .min(10, "Shipping address must be at least 10 characters long"),
  items: Yup.array().of(
    Yup.object().shape({
      productID: Yup.string().required("Product ID is required"),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
      totalAmount: Yup.number()
        .min(0.01, "Total amount must be at least $0.01")
        .required("Total amount is required"),
    })
  ),
});

function Order() {
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [orderData, setOrderData] = useState({
    items: [{ productID: "", quantity: 1, totalAmount: 0 }],
    contact: "",
    shippingAddress: "",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await createOrder(data).unwrap();
      console.log("Order created successfully:", response);
      alert("Order created successfully!");
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Place Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="contact"
            className="block text-lg font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <Controller
            control={control}
            name="contact"
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              />
            )}
          />
          {errors.contact && (
            <p className="text-red-500">{errors.contact.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="shippingAddress"
            className="block text-lg font-medium text-gray-700"
          >
            Shipping Address:
          </label>
          <Controller
            control={control}
            name="shippingAddress"
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              />
            )}
          />
          {errors.shippingAddress && (
            <p className="text-red-500">{errors.shippingAddress.message}</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
          >
            {isLoading ? "Creating Order..." : "Place Order"}
          </button>
        </div>

        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}

export default Order;
