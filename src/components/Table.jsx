import React from "react";

const ReusableTable = ({ columns = [], data = [], renderActions }) => {
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    return <div>Invalid data or columns</div>;
  }

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  };

  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-violet-600 text-white">
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="px-6 py-3 text-left">
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer">
              {columns.map((column) => (
                <td key={column.label} className="px-6 py-4">
                  {typeof column.accessor === "function"
                    ? column.accessor(item)
                    : getNestedValue(item, column.accessor) || "-"}
                </td>
              ))}
              <td className="px-6 py-4">{renderActions(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
