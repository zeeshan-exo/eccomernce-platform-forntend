import React, { useState, useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../features/auth/OrderSlice";
import OrderDelete from "../components/OrderDelete";
import ReusableTable from "../components/Table";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Items per page state

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleDeletion = async (id) => {
    if (!id) {
      console.log("ID is missing");
      return;
    }
    try {
      console.log(`Deleting order with ID: ${id}`);
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const calculateTotalAmount = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.totalAmount || 0), 0);
  };

  const columns = [
    { label: "User Name", accessor: "userName" },
    { label: "Quantity", accessor: "quantity" },
    { label: "Contact", accessor: "contact" },
    { label: "Address", accessor: "shippingAddress" },
    { label: "Total Amount", accessor: "totalAmount" },
  ];

  const formattedData = ordersData?.data.map((order) => ({
    userName: order.user?.name || "N/A",
    quantity:
      Array.isArray(order.items) && order.items.length > 0
        ? order.items.map((item) => `x${item.quantity}`).join(", ")
        : "No items",
    contact: order.contact || "N/A",
    shippingAddress: order.shippingAddress || "N/A",
    totalAmount: `$${calculateTotalAmount(order.items).toFixed(2) || "0.00"}`,
    id: order._id,
  }));

  const renderActions = (order) => (
    <div className="flex flex-wrap gap-2 justify-center">
      <button onClick={() => handleDeletion(order.id)} disabled={deleting}>
        <OrderDelete />
      </button>
    </div>
  );

  // // Handle page change
  // const handlePageChange = (page) => {
  //   if (page > 0) {
  //     setCurrentPage(page);
  //   }
  // };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (ordersData?.pagination?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <p className="text-center text-teal-600">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Error: {error?.data?.message || "Unable to fetch orders"}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-800">Orders</h2>
      </div>

      {ordersData?.data?.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={formattedData}
          renderActions={renderActions}
        />
      ) : (
        <p className="text-center text-gray-500 mt-4">No orders available.</p>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={!ordersData?.pagination?.hasPreviousPage}
          className="px-4 py-2 bg-teal-600 text-white rounded-md"
        >
          Previous
        </button>
        <span>
          Page {ordersData?.pagination?.currentPage} of{" "}
          {ordersData?.pagination?.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!ordersData?.pagination?.hasNextPage}
          className="px-4 py-2 bg-teal-600 text-white rounded-md"
        >
          Next
        </button>
      </div>

      {/* Page size selector
      <div className="mt-4">
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div> */}
    </div>
  );
}

export default Orders;
