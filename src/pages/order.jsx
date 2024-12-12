import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../features/auth/OrderSlice";
import OrderDelete from "../components/OrderDelete";

function Orders() {
  const { data: orders, isLoading, isError, error } = useGetAllOrdersQuery();
  const [deleteOrder, { isLoading: deleting, isSuccess: success }] =
    useDeleteOrderMutation();

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
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">User Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Total Amount</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
                  <td className="px-6 py-4">
                    {Array.isArray(order.items) && order.items.length > 0
                      ? order.items.map((item, index) => (
                          <span key={index}>
                            {item.productID.name} x{item.quantity}
                            {index < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No items"}
                  </td>
                  <td className="px-6 py-4">{order.contact || "N/A"}</td>
                  <td className="px-6 py-4">
                    {order.shippingAddress || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    ${calculateTotalAmount(order.items).toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <OrderDelete
                        handlerDeletion={() => handleDeletion(order._id)}
                        className="bg-red-600 text-white hover:bg-red-700 py-1 px-3 sm:px-4 rounded-md shadow-md transition duration-200"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No orders available.</p>
      )}
    </div>
  );
}

export default Orders;
