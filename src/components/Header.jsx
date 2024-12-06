function Header() {
  return (
    <div className="flex justify-between items-center p-5  bg-teal-50 shadow-lg  border-b-2 border-teal-100">
      <div className="text-2xl font-semibold text-teal-800">Admin Panel</div>

      <div className="flex items-center space-x-4">
        <div className="text-gray-700 font-medium">Profile</div>

        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md transition-transform transform hover:scale-105">
          A
        </div>
      </div>
    </div>
  );
}

export default Header;
