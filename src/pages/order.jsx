import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../features/auth/OrderSlice";
import OrderDelete from "../components/OrderDelete";
import OrderUpdate from "../components/OrderUpdate";
import ReusableTable from "../components/Table";
import OrderForm from "./OrderForm";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery({ page: currentPage, limit: pageSize });

  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleDeletion = async (id) => {
    try {
      console.log(`Deleting order with ID: ${id}`);
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (id) => {
    setSelectedOrderId(id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrderId(null);
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
    <div className="flex gap-2 justify-center">
      <button onClick={() => handleEdit(order.id)}>
        <OrderUpdate />
      </button>
      <button onClick={() => handleDeletion(order.id)} disabled={deleting}>
        <OrderDelete />
      </button>
    </div>
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (ordersData?.pagination?.hasNextPage) setCurrentPage(currentPage + 1);
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
          tableClassName="table-auto w-full sm:w-full overflow-x-auto"
        />
      ) : (
        <p className="text-center text-gray-500 mt-4">No orders available.</p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={!ordersData?.pagination?.hasPreviousPage}
          className="px-4 py-2 bg-teal-600 text-white rounded-md w-full sm:w-auto"
        >
          Previous
        </button>
        <span className="text-center">
          Page {ordersData?.pagination?.currentPage} of{" "}
          {ordersData?.pagination?.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!ordersData?.pagination?.hasNextPage}
          className="px-4 py-2 bg-teal-600 text-white rounded-md w-full sm:w-auto"
        >
          Next
        </button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          <div className="relative bg-white w-96 sm:w-1/3 p-4 shadow-lg">
            <OrderForm id={selectedOrderId} onCancel={handleCloseDrawer} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
