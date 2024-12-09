import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} from "../features/auth/ProductSlice";

function ProductForm({ isUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (isUpdate) {
    var {
      data,
      isLoading: productLoading,
      isError: productFetchError,
    } = useGetOneProductQuery(id);
  }
  const [
    updateProduct,
    {
      isLoading: updateLoading,
      isError: updationError,
      isSuccess: updationSuccess,
    },
  ] = useUpdateProductMutation();
  const [createProduct, { isLoading, isError, isSuccess: creationSuccess }] =
    useCreateProductMutation();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setsubCategory] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompany(data.company);
      setPrice(data.price);
      setDetails(data.details);
      setCategory(data.category);
      setsubCategory(data.subCategory);
    }
  }, [data]);

  if (isLoading || productLoading || updateLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (isError || productFetchError || updationError) {
    return (
      <p className="text-center text-red-500">
        Something went wrong. Please try again.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdate) {
        await updateProduct({ id, name, company, price, details });
      } else {
        await createProduct({
          name,
          company,
          price,
          details,
          category,
          subCategory,
        });
        console.log(createProduct);
      }
      navigate("/admin/product");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">
          {isUpdate ? "Update Product" : "Create New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <input
              id="name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <input
              id="company"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <input
              id="price"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              id="details"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              placeholder="Enter product details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              id="category"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              id="subCategory"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              placeholder="Enter product category"
              value={subCategory}
              onChange={(e) => setsubCategory(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            {isUpdate ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
