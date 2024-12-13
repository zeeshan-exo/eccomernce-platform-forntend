import React, { useState } from "react";
import Button from "../components/Button";
import ReusableTable from "../components/Table";
import UserForm from "./UserForm";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../features/auth/UserSlice";
import UserDelete from "../components/UserDelete";
import UserUpdate from "../components/UserUpdate";

function Users() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
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

  const handleDeletion = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
  ];

  const actions = (user) => (
    <div className="flex gap-2">
      <button onClick={() => handleOpenDrawer(true, user._id)}>
        <UserUpdate />
      </button>
      <button onClick={() => handleDeletion(user._id)}>
        <UserDelete />
      </button>
    </div>
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-8">Error loading users</div>;
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => handleOpenDrawer(false)}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-6 rounded-md shadow-md"
        >
          Add User
        </Button>
      </div>

      <ReusableTable
        columns={columns}
        data={Array.isArray(data) ? data : []}
        renderActions={actions}
      />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>

          <div className="absolute right-0 top-0 w-full max-w-sm h-screen bg-white shadow-lg transform transition-transform duration-300">
            <div className="flex flex-col">
              <div>
                <UserForm
                  isUpdate={isUpdate}
                  userId={selectedUserId}
                  onClose={handleCloseDrawer}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
