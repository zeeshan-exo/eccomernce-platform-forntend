import React from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  // useGetOneOrderQuery,
} from "../features/auth/OrderSlice";
import OrderDelete from "../components/OrderDelete";
import ReusableTable from "../components/Table";

function Orders() {
  const { data: orders, isLoading, isError, error } = useGetAllOrdersQuery();
  // const { data: order, isLoading: loading } = useGetOneOrderQuery();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleDeletion = async (id) => {
    if (!id) {
      console.error("Id is missing");
      return;
    }
    console.log(`Deleting order with ID: ${id}`);
    try {
      await deleteOrder(id).unwrap();
    } catch (error) {
      console.error("Error deleting order:", error);
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

  const formattedData = orders?.map((order) => ({
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
      <OrderDelete handlerDeletion={() => handleDeletion(order.id)} />
    </div>
  );

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
        <h2 className="text-2xl font-bold text-teal-800">Orders</h2>
      </div>

      {orders?.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={formattedData}
          renderActions={renderActions}
        />
      ) : (
        <p className="text-center text-gray-500 mt-4">No orders available.</p>
      )}
    </div>
  );
}

export default Orders;
