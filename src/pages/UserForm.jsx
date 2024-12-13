import React, { useEffect } from "react";
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} from "../features/auth/UserSlice";
import ReusableForm from "../components/Reuseableform";
import * as Yup from "yup";
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

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
//   setValue,
// } = useForm({
//   resolver: yupResolver(productValidation),
// });

function UserForm({ isUpdate, userId, onClose }) {
  const { data, isLoading: userLoading } = useGetOneUserQuery(userId, {
    skip: !isUpdate,
  });

  const [updateUser, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserMutation();
  const [createUser, { isLoading: createLoading, error: createError }] =
    useCreateUserMutation();

  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "name" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "email",
    },
    {
      label: "Role",
      name: "role",
      type: "select",
      options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ],
    },
    ...(isUpdate
      ? []
      : [
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "password",
          },
        ]),
  ];

  const initialValues = isUpdate
    ? {
        name: data?.name || "",
        email: data?.email || "",
        role: data?.role || "",
      }
    : {
        name: "",
        email: "",
        role: "",
        password: "",
      };

  const handleFormSubmit = async (formData) => {
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
      <ReusableForm
        title={isUpdate ? `User: ${data?.name || ""}` : "Add User"}
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={onClose}
        isLoading={updateLoading || createLoading}
        submitLabel={isUpdate ? "Update" : "Add"}
      />

      {(updateError || createError) && (
        <div className="text-red-600 bg-red-100 p-2 rounded mt-4">
          {updateError?.data?.message || createError?.data?.message}
        </div>
      )}
    </div>
  );
}

export default UserForm;
