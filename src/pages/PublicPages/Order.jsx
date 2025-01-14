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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Provide your details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
        <div>
          <label
            htmlFor="contact"
            className="block text-lg font-medium text-gray-700"
          >
            Phone Number
          </label>
          <Controller
            control={control}
            name="contact"
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
            )}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="shippingAddress"
            className="block text-lg font-medium text-gray-700"
          >
            Shipping Address
          </label>
          <Controller
            control={control}
            name="shippingAddress"
            render={({ field }) => (
              <textarea
                {...field}
                rows="3"
                className={`w-full p-3 mt-2 border rounded-lg shadow-sm  ${
                  errors.shippingAddress ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your shipping address"
              />
            )}
          />
          {errors.shippingAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shippingAddress.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-fuchsia-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-fuchsia-900 focus:ring-4  focus:outline-none transition duration-300"
          >
            {isLoading ? "Creating Order..." : "Place Order"}
          </button>
        </div>

        {error && (
          <p className="text-center text-red-500 mt-4">
            {error.message || "Failed to create order. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
}

export default Order;
