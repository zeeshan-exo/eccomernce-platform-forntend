import React, { useState } from "react";
import Button from "../components/Button";
import ProductUpdate from "../components/ProductUpdate";
import ProductDelete from "../components/ProductDelete";
import ReusableTable from "../components/Table";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../features/auth/ProductSlice";
import ProductForm from "./ProductForm";

function Products() {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenDrawer = (update = false, productId = null) => {
    setIsUpdate(update);
    setSelectedProductId(productId);
    setIsDrawerOpen(true);
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
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Brand", accessor: "company" },
    { label: "Category", accessor: "category.name" },
    { label: "SubCategory", accessor: "subCategory.name" },
    { label: "Price", accessor: "price" },
    { label: "Description", accessor: "details" },
  ];

  const renderActions = (product) => (
    <div className="flex gap-2 justify-center">
      <button onClick={() => handleOpenDrawer(true, product._id)}>
        <ProductUpdate />
      </button>
      <button onClick={() => handlerDeletion(product._id)}>
        {deleting ? "Deleting..." : <ProductDelete />}
      </button>
    </div>
  );

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600 mt-10">Error loading products</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Button
          onClick={() => handleOpenDrawer(false)}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-6 rounded-md shadow-md"
        >
          Add Product
        </Button>
      </div>

      <ReusableTable
        columns={columns}
        data={Array.isArray(data) ? data : []}
        renderActions={renderActions}
      />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          {/* <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsDrawerOpen(false)}
          >
            &times;
          </button> */}

          <div className="absolute right-0 top-0 w-full max-w-sm h-screen bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto">
            <div className="flex flex-col">
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
