import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="font-sans bg-teal-700 ">
      <div className="text-white">
        <Header
          title="ElectroHub"
          actions={[
            <Link
              to="/"
              key="home"
              className="hover:text-teal-300 text-white transition-colors"
            >
              Home
            </Link>,
            <a
              href="#features"
              key="features"
              className="hover:text-teal-300 text-white transition-colors"
            >
              Features
            </a>,
            <a
              href="#about"
              key="about"
              className="hover:text-teal-300 text-white transition-colors"
            >
              About
            </a>,
            <a
              href="#contact"
              key="contact"
              className="hover:text-teal-300 text-white transition-colors"
            >
              Contact
            </a>,
            <Link
              to="/signup"
              key="signup"
              className="text-white hover:text-teal-300 bg-black px-4 py-2 transition-colors"
            >
              Sign Up
            </Link>,
            <Link
              to="/login"
              key="login"
              className="text-black hover:text-teal-300 px-4 py-2 bg-white transition-colors"
            >
              Login
            </Link>,
          ]}
          className="bg-gradient-to-tb from-teal-400 to-teal-600 "
        />
      </div>

      <section className="h-screen bg-gradient-to-br from-teal-500 via-teal-700 to-blue-900 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6">
          Welcome to ElectroHub
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-xl mx-auto">
          Build amazing things with us today. Let's create something
          extraordinary together.
        </p>
        <Link
          to="/signup"
          className="bg-white hover:bg-gray-200 text-teal-800 py-2 px-4 rounded-lg text-l transition duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
      </section>

      <section
        id="features"
        className="py-16 bg-gradient-to-b from-gray-100 to-white text-center"
      >
        <h2 className="text-4xl font-bold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Feature One</h3>
            <p className="text-gray-600">
              A unique feature that sets us apart from others in the market.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Feature Two</h3>
            <p className="text-gray-600">
              A powerful feature that helps you achieve more with less effort.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Feature Three</h3>
            <p className="text-gray-600">
              A feature designed to give you an edge in your field and industry.
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 bg-gradient-to-tl from-white to-gray-200 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          We are a dedicated team working towards building the best solutions
          for real-world challenges. Our mission is to create impactful,
          high-quality products that serve our customers.
        </p>
      </section>

      <section
        id="contact"
        className="py-16 bg-gradient-to-tl from-white to-gray-200 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          Have questions? Reach out to us today. We're here to help!
        </p>
        <button className="bg-black text-white py-2 px-4 rounded-lg text-l transition duration-300 transform hover:scale-105">
          Send Message
        </button>
      </section>

      <footer className="bg-teal-600 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} MyBrand. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
