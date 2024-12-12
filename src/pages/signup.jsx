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
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = async () => {
    try {
      await signupSchema.validate(data, { abortEarly: false });

      const response = await signup(data);
      if (!response.data) {
        throw new Error("Failed to signup");
      }
      dispatch(setUser(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-8">
          Sign Up
        </h2>

        <div className="mb-4">
          {/* <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Full Name
          </label> */}
          <input
            id="name"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          {/* <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label> */}
          <input
            id="email"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          {/* <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Password
          </label> */}
          <input
            id="password"
            className={`w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          className="w-full py-2 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
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
            className="text-teal-600 font-semibold hover:text-teal-700"
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
