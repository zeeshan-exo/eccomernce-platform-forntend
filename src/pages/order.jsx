import { useGetAllOrdersQuery } from "../features/auth/OrderSlice";

function Orders() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();

  if (isLoading) {
    return <p className="text-center text-teal-600">Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center">Error: {error?.message}</p>;
  }

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.totalAmount, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-teal-800 mb-6 text-center bg-teal-100 py-4 rounded-lg shadow-md">
        Orders
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Items Quantity</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Shipping Address</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">{order._id}</td>
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
                <td className="px-6 py-4">{order.shippingAddress || "N/A"}</td>
                <td className="px-6 py-4">
                  {calculateTotalAmount(order.items).toFixed(2) || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
