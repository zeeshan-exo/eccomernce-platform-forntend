import React from "react";
import {
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} from "../features/auth/ProductSlice";
import * as Yup from "yup";
import ReusableForm from "../components/Reuseableform";

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

  const formFields = [
    { name: "name", type: "text", placeholder: "name" },
    {
      name: "company",
      type: "text",
      placeholder: "brand",
    },
    {
      name: "category",
      type: "select",
      options: [
        { value: "Electronics", label: "Electronics" },
        { value: "home appliances", label: "Home Appliances" },
      ],
    },
    {
      name: "subCategory",
      type: "select",
      options: [
        { value: "Laptops", label: "Laptops" },
        { value: "Mobiles", label: "Mobiles" },
      ],
    },
    {
      name: "price",
      placeholder: "price",
    },
    {
      name: "details",
      type: "text",
      placeholder: "description",
    },
  ];

  const initialValues = isUpdate
    ? {
        name: data?.name || "",
        company: data?.company || "",
        category: data?.category || "",
        subCategory: data?.subCategory || "",
        price: data?.price || "",
        details: data?.details || "",
      }
    : {
        name: "",
        company: "",
        category: "",
        subCategory: "",
        price: "",
        details: "",
      };

  const handleFormSubmit = async (formData) => {
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
  };

  if (productLoading) return <p>Loading product details...</p>;

  return (
    <div className="p-4">
      <ReusableForm
        title={isUpdate ? ` ${data?.name || ""}` : "Add Product"}
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

export default ProductForm;
