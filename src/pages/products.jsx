import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../features/auth/ProductSlice";
import ProductForm from "./ProductForm";
import ProductUpdate from "../components/ProductUpdate";
import ProductDelete from "../components/ProductDelete";


function Products() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleting, isSuccess: success }] =
    useDeleteProductMutation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenDrawer = (update = false, productId = null) => {
    setIsUpdate(update);
    setSelectedProductId(productId);
    setIsDrawerOpen(true);
    console.log(productId);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProductId(null);
  };

  const handlerDeletion = async (id) => {
    if (!id) {
      console.error("Product ID is missing");
      return;
    }
    console.log(`Deleting product with ID: ${id}`);
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-teal-800 bg-teal-100 py-2 px-4 ">
          Products
        </h2>
        <Button
          onClick={() => handleOpenDrawer(false)}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-6 rounded-md shadow-md"
        >
          Add Product
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-teal-600 text-white text-sm sm:text-base">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left">Brand</th>
              <th className="px-4 sm:px-6 py-3 text-left">Category</th>
              <th className="px-4 sm:px-6 py-3 text-left">SubCategory</th>
              <th className="px-4 sm:px-6 py-3 text-left">Price</th>
              <th className="px-4 sm:px-6 py-3 text-left">Description</th>
              <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  {product.name}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  {product.company}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  {product.category ? product.category.name : "No category"}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  {product.subCategory
                    ? product.subCategory.name
                    : "No subcategory"}
                </td>

                <td className="px-4 sm:px-6 py-4 text-gray-700">
                  ${product.price}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 truncate max-w-[150px] sm:max-w-[250px]">
                  {product.details}
                </td>

                <td className="px-4 sm:px-6 py-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <ProductUpdate
                      handlerUpdate={() => handleOpenDrawer(true, product._id)}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 py-1 px-3 sm:px-4 rounded-md shadow-md transition duration-200"
                    />
                    <ProductDelete
                      handlerDeletion={() => handlerDeletion(product._id)}
                      className="bg-red-600 text-white hover:bg-red-700 py-1 px-3 sm:px-4 rounded-md shadow-md transition duration-200"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>

          <div className="relative w-full max-w-lg h-full bg-white shadow-lg transform transition-transform duration-300">
            <button
              onClick={handleCloseDrawer}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <div className="p-6">
              <ProductForm
                isUpdate={isUpdate}
                id={selectedProductId}
                onClose={handleCloseDrawer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
