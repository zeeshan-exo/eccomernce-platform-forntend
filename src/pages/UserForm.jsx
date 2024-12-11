import React, { useEffect, useState } from "react";
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} from "../features/auth/UserSlice";
import * as Yup from "yup";

const userValidation = Yup.object({
  name: Yup.string().required("please provide the name"),
  email: Yup.email("provide a valid email").required("email required"),
  role: Yup.required("provide a role"),
  password: Yup.string(8, "must be atleast 8 characters").required(
    "password is required"
  ),
});

function UserForm({ isUpdate, userId, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const { data, isLoading: userLoading } = useGetOneUserQuery(userId, {
    skip: !isUpdate,
  });

  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const payload = { name, email, role, password };
    try {
      // await userValidation.validate({
      // })

      if (isUpdate) {
        await updateUser({ id: userId, name, email, role });
      } else {
        await createUser({ name, email, role, password });
      }
      onClose();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  if (userLoading) return <p>Loading user details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        {isUpdate ? "Update User" : "Add New User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {!isUpdate && (
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
        >
          {isUpdate ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
