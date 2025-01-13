import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation, setUser } from "../features/auth/AuthSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters are required")
    .required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading, isSuccess, error, data }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      if (!response?.data) {
        throw new Error("Signup failed");
      }
      dispatch(setUser(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">
          Sign Up
        </h2>

        <div className="mb-4">
          <input
            id="name"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300 ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            id="email"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            id="password"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Password"
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
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>{error.message}</p>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-purple-600 font-semibold hover:text-purple-700"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
