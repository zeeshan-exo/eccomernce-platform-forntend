import React, { useEffect, useCallback } from "react";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} from "../features/auth/ProductSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReusableForm from "../components/Form";

// Form validation schema
const productValidation = Yup.object({
  name: Yup.string().required("Product name is required"),
  company: Yup.string().required("Brand name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  details: Yup.string().optional(),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),
});

function ProductForm({ isUpdate, id, onClose }) {
  const { data, isLoading: productLoading } = useGetOneProductQuery(id, {
    skip: !isUpdate,
  });

  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading, error: createError }] =
    useCreateProductMutation();

  // Default form fields
  const formFields = [
    { name: "name", type: "text", placeholder: "Product name" },
    { name: "company", type: "text", placeholder: "Brand" },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: [
        { value: "Electronics", label: "Electronics" },
        { value: "Home Appliances", label: "Home Appliances" },
      ],
    },
    {
      name: "subCategory",
      type: "select",
      label: "Subcategory",
      options: [
        { value: "Laptops", label: "Laptops" },
        { value: "Smartphones", label: "Smartphones" },
      ],
    },
    { name: "price", placeholder: "Price" },
    { name: "details", type: "text", placeholder: "Description" },
  ];

  // React Hook Form setup
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(productValidation),
    defaultValues: {
      name: "",
      company: "",
      category: "",
      subCategory: "",
      price: "",
      details: "",
    },
  });

  // Load product data if it's an update
  useEffect(() => {
    if (isUpdate && data) {
      reset({
        name: data.name || "",
        company: data.company || "",
        category: data.category || "",
        subCategory: data.subCategory || "",
        price: data.price || "",
        details: data.details || "",
      });
    }
  }, [data, isUpdate, reset]);

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        if (isUpdate) {
          await updateProduct({ id, ...formData }).unwrap();
        } else {
          await createProduct(formData).unwrap();
        }
        onClose();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
    [isUpdate, id, updateProduct, createProduct, onClose]
  );

  if (productLoading) return <p>Loading product details...</p>;

  return (
    <div className="p-4">
      <ReusableForm
        title={isUpdate ? `Editing ${data?.name || "Product"}` : "Add Product"}
        fields={formFields}
        onSubmit={handleSubmit(handleFormSubmit)}
        onCancel={onClose}
        isLoading={updateLoading || createLoading}
        submitLabel={isUpdate ? "Update Product" : "Add Product"}
        control={control}
        errors={formState.errors}
      />

      {/* Error Handling */}
      {(updateError || createError) && (
        <div className="text-red-600 bg-red-100 p-2 rounded mt-4">
          {updateError?.data?.message ||
            createError?.data?.message ||
            "An error occurred. Please try again."}
        </div>
      )}
    </div>
  );
}

export default ProductForm;
