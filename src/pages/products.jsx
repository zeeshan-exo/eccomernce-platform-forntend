import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../features/auth/ProductSlice";
import ProductUpdate from "../components/ProductUpdate";
import ProductDelete from "../components/ProductDelete";

function Products() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleting, isSuccess: success }] =
    useDeleteProductMutation();

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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center bg-teal-100 py-4 rounded-lg shadow-md">
        Products
      </h2>

      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate("create")}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-4 rounded-md shadow-md"
        >
          Create Product
        </Button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Details</th>
              <th className="px-6 py-3 text-left">Catogeries </th>
              <th className="px-6 py-3 text-left">SubCatogeries </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">{product._id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.company}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.details}</td>
                <td className="px-6 py-4">
                  {product.category ? product.category.name : "No category"}
                </td>
                <td className="px-6 py-4">
                  {product.subCategory
                    ? product.subCategory.name
                    : "No subcategory"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <ProductUpdate
                      handlerUpdate={() => navigate(`update/${product._id}`)}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 py-1 px-4 rounded-md shadow-md transition duration-200"
                    />
                    <ProductDelete
                      handlerDeletion={() => handlerDeletion(product._id)}
                      className="bg-red-600 text-white hover:bg-red-700 py-1 px-4 rounded-md shadow-md transition duration-200"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
