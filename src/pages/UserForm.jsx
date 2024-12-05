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

  console.log(data);

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
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {isUpdate ? "Update User" : "Create New User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="name"
              className="form-control w-96 p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="email"
              className="form-control w-96 p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <select
              id="role"
              className="form-control w-96 p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="mb-4">
              <input
                id="password"
                className="form-control w-96 p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="btn font-bold w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isUpdate ? "Update User" : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
