import React, { useState } from "react";
import { useGetAllProductsQuery } from "../../features/auth/ProductSlice";
import { useAddToCartMutation } from "../../features/auth/cartSlice";
import { useSelector } from "react-redux";
import elec from "../../assets/electronics.jpeg";
import { Button, Modal, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductDetails from "./ProductDetails";

function Products() {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const [addToCartMutation] = useAddToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);

  const products = Array.isArray(data?.data) ? data.data : [];

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      alert("Please log in to add products to the cart.");
      return;
    }

    try {
      await addToCartMutation({ userId, productId, quantity }).unwrap();
      alert("Product added to cart!");
    } catch (err) {
      alert(
        err.data?.message || "Failed to add product to cart. Please try again."
      );
    }
  };

  const handleNextPage = () => {
    if (data?.pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.pagination?.hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
          >
            <div className="h-48 bg-gray-300 rounded-lg"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10 font-semibold">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
            >
              <img
                src={product.image || elec}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2 text-lg font-medium">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.details}
                </p>
              </div>
              <div className="p-4 flex justify-between items-center border-t border-gray-200">
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                >
                  <AddShoppingCartIcon className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleOpenModal(product._id)}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <VisibilityIcon className="mr-1" />
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No products available
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={!data?.pagination?.hasPreviousPage}
        >
          Previous
        </Button>
        <span className="text-gray-700 font-medium">
          Page {page} of {data?.pagination?.totalPages || 1}
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={!data?.pagination?.hasNextPage}
        >
          Next
        </Button>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "25%",
            height: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            overflowY: "auto",
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>

          {selectedProductId && <ProductDetails id={selectedProductId} />}
        </Box>
      </Modal>
    </div>
  );
}

export default Products;
