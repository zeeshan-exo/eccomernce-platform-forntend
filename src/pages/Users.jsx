import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserDelete from "../components/UserDelete";
import UserUpdate from "../components/UserUpdate";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../features/auth/UserSlice";

function Users() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllUsersQuery();
  console.log(data);

  const [deleteUser, { isLoading: deleting, isSuccess: success }] =
    useDeleteUserMutation();

  const handlerDeletion = async (id) => {
    if (!id) {
      console.error("User ID is missing");
      return;
    }
    console.log(`Deleting user with ID: ${id}`);
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center bg-teal-100 py-4 rounded-lg shadow-md">
        Users
      </h2>

      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate("create")}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-4 rounded-md shadow-md"
        >
          Create User
        </Button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <UserUpdate
                      handlerUpdate={() => navigate(`update/${user._id}`)}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 py-1 px-4 rounded-md shadow-md transition duration-200"
                    />
                    <UserDelete
                      handlerDeletion={() => handlerDeletion(user._id)}
                      className="bg-red-600 text-white hover:bg-red-700 py-1 px-4 rounded-md shadow-md transition duration-200"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
