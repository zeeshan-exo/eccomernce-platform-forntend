import React from "react";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-teal-800 text-white shadow-md p-4">
        <Header />
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-teal-700">
              Total Products
            </h3>
            <p className="text-gray-600 mt-2 text-lg">120</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-teal-700">
              Total Customers
            </h3>
            <p className="text-gray-600 mt-2 text-lg">300</p>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-teal-700">
              Total Orders
            </h3>
            <p className="text-gray-600 mt-2 text-lg">450</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
