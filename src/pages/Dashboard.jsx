import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-teal-50 shadow-lg border-b">
          <Header />
        </div>

        <div className="p-6 bg-gray-50 flex-1 overflow-auto">
          <h1 className="text-4xl font-bold text-teal-800 mb-6">Dashboard</h1>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-teal-800">
                Total Products
              </h3>
              <p className="mt-2 text-gray-600 text-xl">Products</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-teal-800">
                Total Customers
              </h3>
              <p className="mt-2 text-gray-600 text-xl">customer</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-teal-800">
                Total Orders
              </h3>
              <p className="mt-2 text-gray-600 text-xl">order amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
