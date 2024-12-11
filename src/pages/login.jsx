import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, setUser } from "../features/auth/AuthSlice";
import * as Yup from "yup";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Provide a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Login() {
  const [email, setEmail] = useState("zeeshan2@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      await loginValidation.validate(data, { abortEarly: false });

      const response = await login(data).unwrap();
      if (!response.data) {
        throw new Error("Failed to login");
      }
      dispatch(setUser(response.data.data));
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.name === "ValidationError") {
        const formErrors = error.inner.reduce((acc, currError) => {
          acc[currError.path] = currError.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        console.log("Login failed:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-8">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>{error.message}</p>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            className="text-teal-600 hover:text-teal-700 font-semibold"
            to="/"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
