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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data, isLoading, isError, error } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

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

  const handlePreviousPage = () => {
    if (data.pagination.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data.pagination.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
  ];

  const actions = (user) => (
    <div className="flex gap-2">
      <UserUpdate handlerUpdate={() => handleOpenDrawer(true, user._id)} />
      <UserDelete handlerDeletion={() => handleDeletion(user._id)} />
    </div>
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-8">
        Error loading users: {error?.message || "Unknown error"}
      </div>
    );
  }

  const { pagination, data: users } = data;

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
        data={Array.isArray(users) ? users : []}
        renderActions={actions}
        onRowClick={(user) => handleOpenDrawer(true, user._id)}
      />

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={!pagination.hasPreviousPage}
          className={`px-4 py-2 bg-teal-600 text-white rounded-md ${
            !pagination.hasPreviousPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!pagination.hasNextPage}
          className={`px-4 py-2 bg-teal-600 text-white rounded-md ${
            !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          <div className="absolute right-0 top-0 w-full max-w-sm h-screen bg-white shadow-lg transform transition-transform duration-300">
            <div className="flex flex-col">
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
