import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import Logout from "../pages/logout";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CartDisplay from "../pages/Cart";

function HeaderHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleSearch = () => {
    searchParams.set("search", searchInput);
    setSearchParams(searchParams);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
        className="text-gray-800 hover:text-purple-900 transition-all duration-300 py-2 font-medium"
      >
        Home
      </Link>
      <Link
        to="/home/products"
        className="text-gray-800 hover:text-purple-900 transition-all duration-300 py-2 font-medium"
      >
        Products
      </Link>
      <Link
        to="/home/categories"
        className="text-gray-800 hover:text-purple-900 transition-all duration-300 py-2 font-medium"
      >
        Categories
      </Link>
      <button
        onClick={openCart}
        className="text-gray-800 hover:text-purple-900 transition-all duration-300 py-2 font-medium"
      >
        <ShoppingCartCheckoutIcon />
      </button>
      {!user && (
        <Link
          to="/login"
          className="text-gray-800 hover:text-purple-700 transition-all duration-300 py-2 font-medium"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/signup"
          className="bg-black text-white hover:text-purple-700 rounded-full px-6 py-2 font-semibold transition-all duration-300"
        >
          Sign Up
        </Link>
      )}
      {user && <Logout />}
    </div>
  );

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="flex justify-between items-center p-2 max-w-screen-xl mx-auto">
          <div className="text-purple-900 text-3xl font-bold">
            <span>ElectroHub</span>
          </div>

          <div className="hidden lg:flex justify-center p-2 flex-grow">
            <div className="relative w-full max-w-md">
              <input
                value={searchInput}
                onChange={onChangeSearch}
                onKeyDown={handleKey}
                type="text"
                className="p-2 w-full rounded-full bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900 transition-all duration-300"
                placeholder="Search products..."
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 py-2 px-2 rounded-full hover:text-black focus:outline-none transition-all duration-200"
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
      </header>

      <Modal open={isCartOpen} onClose={closeCart}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "25%",
            height: "100%",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            overflowY: "auto",
          }}
        >
          <button
            onClick={closeCart}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <CartDisplay />
        </Box>
      </Modal>
    </>
  );
}

export default HeaderHome;
