import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, setUser } from "../features/auth/AuthSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Provide a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (!response?.data) {
        throw new Error("Failed to login");
      }

      dispatch(setUser(response.data));

      navigate("/");
    } catch (error) {
      console.log("Login failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">
          Login
        </h2>

        <div className="relative mb-4">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-4">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={`peer w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="w-full py-2 bg-purple-800 text-white text-lg font-semibold rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
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

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            className="text-purple-600 hover:text-purple-700 font-semibold"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
