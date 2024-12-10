import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} from "../features/auth/UserSlice";

function UserForm({ isUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (isUpdate) {
    var {
      data,
      isLoading: userLoading,
      isError: userFetchError,
    } = useGetOneUserQuery(id);
  }

  const [
    updateUser,
    {
      isLoading: updateLoading,
      isError: updationError,
      isSuccess: updationSuccess,
    },
  ] = useUpdateUserMutation();
  const [createUser, { isLoading, isError, isSuccess: creationSuccess }] =
    useCreateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
    }
  }, [data]);

  if (isLoading || userLoading || updateLoading) {
    return <p>Loading...</p>;
  }

  if (isError || userFetchError || updationError) {
    return <p>Something went wrong. Please try again.</p>;
  }

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdate) {
        await updateUser({ id, name, email, role });
      } else {
        await createUser({ name, email, role, password });
      }
      navigate("/admin/customer");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-teal-700 text-center mb-6">
          {isUpdate ? "Update User" : "Create New User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {!isUpdate && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            {isUpdate ? "Update User" : "Create User"}
          </button>
        </form>

        {(isError || userFetchError || updationError) && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
