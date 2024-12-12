import React, { useEffect } from "react";
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} from "../features/auth/UserSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userValidation = Yup.object({
  name: Yup.string().required("Please provide a valid name"),
  email: Yup.string()
    .email("Provide a valid email")
    .required("Email is required"),
  role: Yup.string().required("Provide a role"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function UserForm({ isUpdate, userId, onClose }) {
  const { data, isLoading: userLoading } = useGetOneUserQuery(userId, {
    skip: !isUpdate,
  });

  const [updateUser, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserMutation();
  const [createUser, { isLoading: createLoading, error: createError }] =
    useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidation),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("email", data.email || "");
      setValue("role", data.role || "");
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      if (isUpdate) {
        await updateUser({ id: userId, ...formData }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (userLoading) return <p>Loading user details...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        {isUpdate ? "Update User" : "Add New User"}
      </h2>

      {(updateError || createError) && (
        <div className="text-red-600 bg-red-100 p-2 rounded mb-4">
          {updateError?.data?.message || createError?.data?.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Role</label>
          <select
            {...register("role")}
            className={`w-full p-2 border rounded ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {!isUpdate && (
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full p-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-black font-semibold hover:bg-teal-700 transition"
            disabled={userLoading || updateLoading || createLoading}
          >
            {isUpdate ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
