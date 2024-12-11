import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} from "../features/auth/ProductSlice";
import * as Yup from "yup";

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
  const [createProduct, { isLoading, isError: creationError }] =
    useCreateProductMutation();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setCompany(data.company || "");
      setPrice(data.price || "");
      setDetails(data.details || "");
      setCategory(data.category || "");
      setSubCategory(data.subCategory || "");
    }
  }, [data]);

  const isFormLoading = isLoading || productLoading || updateLoading;
  const isFormError = creationError || productFetchError || updationError;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, company, price, details, category, subCategory };

    try {
      await productValidation.validate(payload, { abortEarly: false });

      if (isUpdate) {
        await updateProduct({ id, ...payload });
      } else {
        await createProduct(payload);
      }
      navigate("/admin/product");
    } catch (error) {
      if (error.name === "ValidationError") {
        const formErrors = error.inner.reduce((acc, currError) => {
          acc[currError.path] = currError.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        console.log("Submission failed:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              id="name"
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${errors.name ? "border-red-500" : ""}`}
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="company"
              className="block text-gray-700 font-medium"
            >
              Brand
            </label>
            <input
              id="company"
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${errors.company ? "border-red-500" : ""}`}
              type="text"
              placeholder="Brand name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company}</p>
            )}
          </div>

          <div className="col-span-1">
            <label htmlFor="price" className="block text-gray-700 font-medium">
              Price
            </label>
            <input
              id="price"
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${errors.price ? "border-red-500" : ""}`}
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="subCategory"
              className="block text-gray-700 font-medium"
            >
              Subcategory
            </label>
            <select
              id="subCategory"
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="" disabled>
                Select subcategory
              </option>
              <option value="Laptops">Laptops</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="details"
              className="block text-gray-700 font-medium"
            >
              Product Details
            </label>
            <textarea
              id="details"
              className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition h-28"
              placeholder="Product details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              {isUpdate ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
