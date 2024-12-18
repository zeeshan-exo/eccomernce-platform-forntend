import React, { useEffect } from "react";
import {
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} from "../features/auth/UserSlice";
import ReusableForm from "../components/Form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userValidationSchema = Yup.object({
  name: Yup.string().required("Please provide a valid name"),
  email: Yup.string()
    .email("Provide a valid email")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .when("isUpdate", {
      is: false,
      then: Yup.string().required("Password is required for new users"),
    }),
});

function UserForm({ isUpdate, userId, onClose }) {
  const { data, isLoading: userLoading } = useGetOneUserQuery(userId, {
    skip: !isUpdate,
  });

  const [updateUser, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserMutation();
  const [createUser, { isLoading: createLoading, error: createError }] =
    useCreateUserMutation();

  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isUpdate && data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "",
      });
    }
  }, [data, isUpdate, reset]);

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
        title={isUpdate ? ` ${data?.name || ""}` : "Add User"}
        fields={formFields}
        onSubmit={handleSubmit(handleFormSubmit)}
        onCancel={onClose}
        isLoading={updateLoading || createLoading}
        submitLabel={isUpdate ? "Update" : "Add"}
        control={control}
        errors={errors}
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
