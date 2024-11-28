function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-semibold  text-indigo-700">Dashboard</div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-600">Admin</div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>{" "}
      </div>
    </div>
  );
}

export default Header;
