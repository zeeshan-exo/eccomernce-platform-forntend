import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="font-sans bg-teal-700">
      <div className="text-white">
        <Header
          title="ElectroHub"
          actions={[
            <a
              href="#features"
              key="features"
              className="hover:text-teal-300 text-white transition-colors text-lg font-medium"
            >
              Features
            </a>,
            <a
              href="#about"
              key="about"
              className="hover:text-teal-300 text-white transition-colors text-lg font-medium"
            >
              About
            </a>,
            <a
              href="#contact"
              key="contact"
              className="hover:text-teal-300 text-white transition-colors text-lg font-medium"
            >
              Contact
            </a>,
            <Link
              to="/admin/dashboard"
              className="hover:text-teal-300 text-white transition-colors text-lg font-medium"
            >
              Admin
            </Link>,
            !user && (
              <Link
                to="/signup"
                key="signup"
                className="text-white hover:text-teal-300 bg-black px-6 py-2 rounded-lg transition-colors text-lg font-semibold"
              >
                Sign Up
              </Link>
            ),
            !user && (
              <Link
                to="/login"
                key="login"
                className="text-black hover:text-teal-300 px-6 py-2 bg-white rounded-lg transition-colors text-lg font-semibold"
              >
                Login
              </Link>
            ),
          ]}
          className="bg-gradient-to-tb from-teal-400 to-teal-600 sticky top-0 z-50 shadow-lg"
        />
      </div>

      <section className="h-screen bg-gradient-to-br from-teal-500 via-teal-700 to-blue-900 flex flex-col justify-center items-center text-center px-4 py-16">
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 animate__animated animate__fadeIn">
          Welcome to ElectroHub
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Build amazing things with us today. Let's create something
          extraordinary together.
        </p>
        <Link
          to="/home/products"
          className="bg-white hover:bg-gray-200 text-teal-800 py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </Link>
      </section>

      <section
        id="features"
        className="py-16 bg-gradient-to-b from-gray-100 to-white text-center"
      >
        <h2 className="text-4xl font-bold mb-8 text-teal-800">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {["Feature One", "Feature Two", "Feature Three"].map(
            (feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 "
              >
                <h3 className="text-2xl font-semibold mb-4 text-teal-700">
                  {feature}
                </h3>
                <p className="text-gray-600">
                  A feature designed to give you an edge in your field and
                  industry.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section
        id="about"
        className="py-16 bg-gradient-to-tl from-white to-gray-200 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-teal-800">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          We are a dedicated team working towards building the best solutions
          for real-world challenges. Our mission is to create impactful,
          high-quality products that serve our customers.
        </p>
      </section>

      <section
        id="contact"
        className="py-16 bg-gradient-to-tl from-white to-gray-200 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-teal-800">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          Have questions? Reach out to us today. We're here to help!
        </p>
        <button className="bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 shadow-lg">
          Send Message
        </button>
      </section>

      <footer className="bg-teal-600 text-white py-4 text-center">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
