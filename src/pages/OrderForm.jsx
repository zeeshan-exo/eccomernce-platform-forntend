import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useGetOneOrderQuery,
  useUpdateOrderMutation,
} from "../features/auth/OrderSlice";
import ReusableForm from "../components/Form";

const validationSchema = yup.object().shape({
  userName: yup.string().required("User Name is required").min(2, "Too short"),
  contact: yup
    .string()
    .matches("Contact must be a valid number")
    .required("Contact is required"),
  shippingAddress: yup
    .string()
    .required("Address is required")
    .min(5, "Address is too short"),
  totalAmount: yup
    .number()
    .typeError("Total Amount must be a number")
    .positive("Total Amount must be greater than zero")
    .required("Total Amount is required"),
});

function OrderForm({ id, onCancel }) {
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOneOrderQuery(id);

  const [updateOrder, { isLoading: updateLoading, error: updateError }] =
    useUpdateOrderMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    if (orderData) {
      reset({
        userName: orderData.user?.name || "",
        contact: orderData.contact || "",
        shippingAddress: orderData.shippingAddress || "",
        totalAmount: orderData.totalAmount || "",
      });

      setFormFields([
        {
          name: "userName",
          label: "User Name",
          placeholder: "Enter User Name",
          type: "text",
        },
        {
          name: "contact",
          label: "Contact",
          placeholder: "Enter Contact Number",
          type: "text",
        },
        {
          name: "shippingAddress",
          label: "Address",
          placeholder: "Enter Shipping Address",
          type: "text",
        },
        {
          name: "totalAmount",
          label: "Total Amount",
          placeholder: "Enter Total Amount",
        },
      ]);
    }
  }, [orderData, reset]);

  const onSubmit = async (data) => {
    try {
      await updateOrder({ id, ...data }).unwrap();
      alert("Order updated successfully!");
      if (onCancel) onCancel();
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  if (orderLoading) {
    return <p className="text-center text-teal-600">Loading order...</p>;
  }

  if (orderError) {
    return (
      <p className="text-red-500 text-center">
        Error: {orderError?.data?.message || "Unable to fetch order details"}
      </p>
    );
  }

  return (
    <div className="p-4">
      <ReusableForm
        title="Update Order"
        fields={formFields}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={onCancel}
        submitLabel={updateLoading ? "Updating..." : "Update"}
        isLoading={updateLoading}
        control={control}
        errors={errors}
      />
      {updateError && (
        <p className="text-red-500 mt-4">
          Error: {updateError?.data?.message || "Failed to update the order."}
        </p>
      )}
    </div>
  );
}

export default OrderForm;
