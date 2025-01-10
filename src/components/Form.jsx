import React from "react";

const ReusableForm = ({
  title = "Form",
  fields = [],
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  isLoading = false,
  control,
  errors,
}) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-600">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            {field.type === "select" ? (
              <select
                {...control.register(field.name)}
                defaultValue=""
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="" disabled>
                  {field.placeholder || `Select ${field.label}`}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                {...control.register(field.name)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            )}
            {errors[field.name] && (
              <p className="text-red-600">{errors[field.name].message}</p>
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
