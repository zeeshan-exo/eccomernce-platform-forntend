import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductForm({ isUpdate }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (isUpdate) {
      getProductById();
    }
  }, []);

  const getProductById = async () => {
    const response = await fetch(`http://localhost:3001/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();
      setName(result.data.name);
      setCompany(result.data.company);
      setPrice(result.data.price);
      setDetails(result.data.details);
    }
  };

  const handleSubmit = async () => {
    if (isUpdate) {
      const response = await fetch(`http://localhost:3001/api/product/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, company, price, details }),
      });
    } else {
      const response = await fetch(`http://localhost:3001/api/product/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, company, price, details }),
      });
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isUpdate ? "Update" : "Create New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="name"
              className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
