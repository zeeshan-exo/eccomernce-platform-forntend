import React, { useState, useEffect } from "react";
import Product from "../components/Product";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/api/product", {
        method: "GET",
        Headers: {
          "Content-Type": "application/json",
        },
      });

      const products = await response.json();
      setProducts(products.data);
      console.log("Products:", products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container-fluid my-4">
      <h3 className="text-center mb-4 font-bold text-4xl text-indigo-600">
        Products
      </h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <Product value={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
