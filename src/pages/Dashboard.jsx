import React from "react";
import Header from "../components/Header";
import { useGetDashboardQuery } from "../features/auth/DashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full border-4 border-t-4 border-gray-600 w-16 h-16 mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const { orderCount, productCount, userCount, totalRevenue } =
    data?.stats || {};
  const recentOrders = data?.recentOrders || [];
  const topProducts = data?.topProducts || [];

  const chartData = [
    {
      name: "Total",
      Products: productCount || 0,
      Customers: userCount || 0,
      Orders: orderCount || 0,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-teal-800 text-white shadow-md p-4 ">
        <Header />
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-teal-600">
              Total Products
            </h3>
            <p className="text-gray-600 mt-2 text-lg">{productCount || 0}</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-indigo-400">
              Total Customers
            </h3>
            <p className="text-gray-600 mt-2 text-lg">{userCount || 0}</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-orange-300">
              Total Orders
            </h3>
            <p className="text-gray-600 mt-2 text-lg">{orderCount || 0}</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-indigo-800">
              Total Revenue
            </h3>
            <p className="text-gray-600 mt-2 text-lg">${totalRevenue || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-teal-700 mb-6">
            Key Metrics
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Products" fill="#82ca9d" />
              <Bar dataKey="Customers" fill="#8884d8" />
              <Bar dataKey="Orders" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            Recent Orders
          </h3>
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-md shadow-sm"
                >
                  {/* <p className="text-xl text-teal-700">Order ID: {order._id}</p> */}
                  <p className="text-gray-600">
                    Shipping Address: {order.shippingAddress}
                  </p>
                  <div className="mt-2">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex justify-between">
                        <p className="text-gray-600">
                          Product ID: {item.productID}
                        </p>
                        <p className="text-teal-700">
                          {item.quantity} x ${item.totalAmount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent orders.</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            Top Products
          </h3>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4 border rounded-md shadow-sm"
                >
                  <div>
                    <p className="text-lg font-semibold text-teal-700">
                      {product.product}
                    </p>
                    <p className="text-gray-600">Company: {product.company}</p>
                  </div>
                  <p className="text-xl text-teal-700">
                    Total Sold: {product.totalSold}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No top products data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
