import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import Logout from "../pages/logout";
function HeaderHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleSearch = () => {
    searchParams.set("search", searchInput);
    setSearchParams(searchParams);
  };

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerActions = (
    <div className="flex space-x-8">
      <Link
        to="/"
        className="text-gray-800 hover:text-teal-500 transition-all duration-300 py-2 font-medium"
      >
        Home
      </Link>
      <Link
        to="/home/products"
        className="text-gray-800 hover:text-teal-500 transition-all duration-300 py-2 font-medium"
      >
        Products
      </Link>
      <Link
        to="/home/categories"
        className="text-gray-800 hover:text-teal-500 transition-all duration-300 py-2 font-medium"
      >
        Categories
      </Link>
      <Link
        to="/home/cart"
        className="text-gray-800 hover:text-teal-500 transition-all duration-300 py-2 font-medium"
      >
        Cart
      </Link>
      {!user && (
        <Link
          to="/login"
          className="text-gray-800 hover:text-teal-500 transition-all duration-300 py-2 font-medium"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/signup"
          className="bg-teal-600 text-white hover:bg-teal-700 rounded-full px-6 py-2 font-semibold transition-all duration-300"
        >
          Sign Up
        </Link>
      )}
      {user && <Logout />}
    </div>
  );

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center p-2 max-w-screen-xl mx-auto">
        <div className="text-green-800 text-3xl font-bold">
          <span>ElectroHub</span>
        </div>

        <div className="hidden lg:flex justify-center p-2 flex-grow">
          <div className="relative w-full max-w-md">
            <input
              value={searchInput}
              onChange={onChangeSearch}
              type="text"
              className="p-2 w-full rounded-full bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              placeholder="Search products..."
            />
            <button
              aria-label="Search"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 py-2 px-2 rounded-full hover:text-teal-500 focus:outline-none transition-all duration-200"
              onClick={handleSearch}
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex space-x-8">{headerActions}</div>

        <div className="lg:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-gray-800 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-teal-600 text-white p-4 space-y-4">
          {headerActions.props.children.map((action, index) => (
            <div key={index} className="hover:bg-teal-500 p-2 rounded-md">
              {action}
            </div>
          ))}
        </div>
      )}

      <div className="lg:hidden p-4">
        <div className="relative w-full">
          <input
            type="text"
            className="p-2 w-full rounded-full bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            placeholder="Search products..."
          />
          <button
            aria-label="Search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 rounded-full hover:text-teal-500 focus:outline-none transition-all duration-200"
          >
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
