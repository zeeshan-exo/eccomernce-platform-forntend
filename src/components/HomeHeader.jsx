import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { useState } from "react";

function HeaderHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerActions = [
    <div className="relative">
      <input
        type="text"
        className="p-2 rounded-full w-72 md:w-96 bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black  transition-all duration-300"
        placeholder="Search..."
      />
      <button
        aria-label="Search"
        className="absolute right-2 text-black py-3 px-2 rounded-full hover:text-black focus:outline-none transition-all duration-200 transform hover:scale-105"
      >
        <FaSearch className="text-xl" />
      </button>
    </div>,
    <div className="flex space-x-4">
      <Link
        to="/"
        key="home"
        className="text-gray-800 hover:text-teal-500 transition-colors py-2 font-semibold"
      >
        Home
      </Link>
      <Link
        to="/home/products"
        key="products"
        className="text-gray-800 hover:text-teal-500 transition-colors py-2 font-semibold"
      >
        Products
      </Link>
      <Link
        to="/home/categories"
        key="categories"
        className="text-gray-800 hover:text-teal-500 transition-colors py-2 font-semibold"
      >
        Categories
      </Link>
      <Link
        to="/home/cart"
        key="cart"
        className="text-gray-800 hover:text-teal-500 transition-colors py-2 font-semibold"
      >
        Cart
      </Link>
      <Link
        to="/login"
        key="login"
        className="text-gray-800 hover:text-teal-500 transition-colors py-2 font-semibold"
      >
        Login
      </Link>
      <Link
        to="/signup"
        key="signup"
        className="bg-teal-600 text-white hover:bg-teal-700 rounded-full px-6 py-2 font-semibold transition-colors"
      >
        Sign Up
      </Link>
    </div>,
  ];

  return (
    <header className="text-black bg-white shadow-md">
      <Header
        title={
          <span className="text-teal-600 text-3xl font-semibold">
            ElectroHub
          </span>
        }
        actions={headerActions}
        className="flex justify-between items-center p-4"
      />
      <button
        className="lg:hidden p-2 text-teal-600"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        <FaBars className="text-2xl" />
      </button>

      {isMenuOpen && (
        <div className="lg:hidden bg-teal-600 text-white p-4 space-y-4">
          {headerActions.map((action, index) => (
            <div key={index} className="hover:bg-teal-500 p-2 rounded-md">
              {action}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

export default HeaderHome;
