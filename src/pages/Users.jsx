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
    <div className="flex gap-2 justify-center">
      <UserUpdate handlerUpdate={() => handleOpenDrawer(true, user._id)} />
      <UserDelete handlerDeletion={() => handleDeletion(user._id)} />
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-40 bg-gray-300 animate-pulse"></div>
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => handleOpenDrawer(false)}
          className="bg-teal-600 text-white hover:bg-teal-700 transition duration-200 py-2 px-6 rounded-md shadow-md"
        >
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto">
        <ReusableTable
          columns={columns}
          data={Array.isArray(users) ? users : []}
          renderActions={actions}
          onRowClick={(user) => handleOpenDrawer(true, user._id)}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 sm:gap-0">
        <button
          onClick={handlePreviousPage}
          disabled={!pagination.hasPreviousPage}
          className={`px-4 py-2 bg-teal-600 text-white rounded-md w-full sm:w-auto ${
            !pagination.hasPreviousPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span className="text-center">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!pagination.hasNextPage}
          className={`px-4 py-2 bg-teal-600 text-white rounded-md w-full sm:w-auto ${
            !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end items-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          <div className="relative bg-white w-full max-w-md sm:w-1/2 h-screen p-4 shadow-lg transform transition-transform duration-300">
            <UserForm
              isUpdate={isUpdate}
              userId={selectedUserId}
              onClose={handleCloseDrawer}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
