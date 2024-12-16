import React, { useEffect, useState } from "react";

const ReusableForm = ({
  title = "Form",
  fields = [],
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const data = {};
    fields.forEach((field) => {
      data[field.name] = initialValues[field.name] || "";
    });
    setFormData(data);
  }, [fields, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-teal-700">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-gray-700 font-medium mb-1"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required={field.required || false}
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder || ""}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required={field.required || false}
              />
            )}
          </div>
        ))}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"
            } text-white px-4 py-2 rounded-md shadow-md transition duration-200`}
          >
            {isLoading ? "Processing..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReusableForm;
