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


  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompany(data.company);
      setPrice(data.price);
      setDetails(data.details);
    }
  }, [data]);

  if (isLoading || productLoading || updateLoading) {
    return <p>Loading...</p>;
  }

  if (isError || productFetchError || updationError) {
    return <p>Something went wrong. please try again</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdate) {
        await updateProduct({ id, name, company, price, details });
       
      } else {
        await createProduct({ name, company, price, details });
        
      }
      navigate("/admin/product");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isUpdate ? "Update Product" : "Create New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="name"
              className="form-control w-96 p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="company"
              className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="price"
              className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              id="details"
              className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn font-bold w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isUpdate ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
