import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../features/auth/UserSlice";
import Button from "../components/Button";
import UserDelete from "../components/UserDelete";
import UserUpdate from "../components/UserUpdate";
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
    return <p>Loading......</p>;
  }

  // const filterUsers = data.filter((data) => data.role != "admin");

  return (
    <div className="container-fluid my-4">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Users
      </h2>

      <Button onClick={() => navigate("create")} className={"ml-4"}>
        Create User
      </Button>

      <table className="table-auto w-full border-separate border-spacing-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <UserUpdate
                      handlerUpdate={() => navigate(`update/${user._id}`)}
                    />
                    <UserDelete
                      handlerDeletion={() => handlerDeletion(user._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-6 py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;


