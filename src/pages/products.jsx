import React, { useState, useEffect } from "react";
import ProductHeader from "../components/productHeader";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(response);
      setProducts(data.data);
      console.log("Products:", products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container-fluid my-4">
      <ProductHeader />

      <table className="table-auto w-full border-separate border-spacing-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Company</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{product.productID}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.company}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
