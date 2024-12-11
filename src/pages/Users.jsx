import React, { useState } from "react";

import Button from "../components/Button";
import UserDelete from "../components/UserDelete";
import UserUpdate from "../components/UserUpdate";
import UserForm from "./UserForm";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../features/auth/UserSlice";

function Users() {
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenDrawer = (update = false, userId = null) => {
    setIsUpdate(update);
    setSelectedUserId(userId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUserId(null);
  };

  const handleDeletion = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-800">Users</h2>
        <Button
          onClick={() => handleOpenDrawer(false)}
          className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
        >
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex gap-2">
                  <UserUpdate
                    handlerUpdate={() => handleOpenDrawer(true, user._id)}
                    className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700"
                  />
                  <UserDelete
                    handlerDeletion={() => handleDeletion(user._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>

          <div className="relative w-full max-w-lg h-full bg-white shadow-lg transform transition-transform duration-300">
            <button
              onClick={handleCloseDrawer}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <div className="p-6">
              <UserForm
                isUpdate={isUpdate}
                userId={selectedUserId}
                onClose={handleCloseDrawer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
