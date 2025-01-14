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

const productValidation = Yup.object({
  name: Yup.string().required("Product name is required"),
  company: Yup.string().required("Brand name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  details: Yup.string().optional(),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),
  image: Yup.mixed().optional(),
});

function ProductForm({ isUpdate, id, onClose }) {
  const { data, isLoading: productLoading } = useGetOneProductQuery(id, {
    skip: !isUpdate,
  });

  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading, error: createError }] =
    useCreateProductMutation();

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
    {
      name: "image",
      type: "file",
      placeholder: "chosse file",
    },
  ];

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(productValidation),
    defaultValues: {
      name: "",
      company: "",
      category: "",
      subCategory: "",
      price: "",
      details: "",
      image: null,
    },
  });

  useEffect(() => {
    if (isUpdate && data) {
      reset({
        name: data?.name || "",
        company: data?.company || "",
        category: data?.category?.name || "",
        subCategory: data?.subCategory?.name || "",
        price: data?.price || "",
        details: data?.details || "",
        image: data?.image || null,
      });
    }
  }, [data, isUpdate, reset]);

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        const { image, ...restData } = formData;
        const formDataToSend = new FormData();

        Object.keys(restData).forEach((key) => {
          formDataToSend.append(key, restData[key]);
        });

        if (image && image.length > 0) {
          formDataToSend.append("image", image[0]);
        }

        if (isUpdate) {
          await updateProduct({ id, formData: formDataToSend }).unwrap();
        } else {
          await createProduct(formDataToSend).unwrap();
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
        title={isUpdate ? `${data?.name || ""}` : "Add Product"}
        fields={formFields}
        onSubmit={handleSubmit(handleFormSubmit)}
        encType={"multipart/form-data"}
        onCancel={onClose}
        isLoading={updateLoading || createLoading}
        submitLabel={isUpdate ? "Update" : "Add"}
        control={control}
        errors={formState.errors}
      />

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
