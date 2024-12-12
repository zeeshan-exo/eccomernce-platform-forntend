import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} from "../features/auth/ProductSlice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const productValidation = Yup.object({
  name: Yup.string().required("Product name is required"),
  company: Yup.string().required("Brand name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  details: Yup.string().optional(),
});

function ProductForm({ isUpdate, id }) {
  const navigate = useNavigate();

  const {
    data,
    isLoading: productLoading,
    isError: productFetchError,
  } = isUpdate ? useGetOneProductQuery(id) : {};

  const [updateProduct, { isLoading: updateLoading, isError: updationError }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading, isError: creationError }] =
    useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productValidation),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("company", data.company || "");
      setValue("price", data.price || "");
      setValue("details", data.details || "");
      setValue("category", data.category || "");
      setValue("subCategory", data.subCategory || "");
    }
  }, [data, setValue]);

  const onSubmit = async (payload) => {
    try {
      if (isUpdate) {
        await updateProduct({ id, ...payload });
      } else {
        await createProduct(payload);
      }
      navigate("/admin/product");
    } catch (error) {
      console.log("Submission failed:", error.message);
    }
  };

  const isFormLoading = createLoading || productLoading || updateLoading;
  const isFormError = creationError || productFetchError || updationError;

  return (
    <div className="rounded-lg p-4 sm:p-4 w-auto h-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        {isUpdate ? "Update Product" : "Add New Product"}
      </h2>

      {isFormLoading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading product details...
        </p>
      )}

      {isFormError && (
        <p className="text-center text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 h-auto">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            id="name"
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-gray-700 font-medium mb-1"
          >
            Brand
          </label>
          <input
            id="company"
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="name"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-1"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            {...register("category")}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="subCategory"
            className="block text-gray-700 font-medium mb-1"
          >
            Subcategory
          </label>
          <select
            id="subCategory"
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            {...register("subCategory")}
          >
            <option value="" disabled>
              Select subcategory
            </option>
            <option value="Laptops">Laptops</option>
            <option value="Phones">Phones</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Price
          </label>
          <input
            id="price"
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Price"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="details"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition resize-none"
            placeholder="Description"
            {...register("details")}
            rows="1"
          />
        </div>

        <div className="flex justify-end gap-4 items-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            {isFormLoading ? (
              <span className="animate-spin">⏳</span>
            ) : isUpdate ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
