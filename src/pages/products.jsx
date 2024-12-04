import React, { useState, useEffect } from "react";
import ProductUpdate from "../components/ProductUpdate";
import ProductDelete from "../components/ProductDelete";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
// import { useDispatch } from "react-redux";
// import { useGetAllProductsQuery } from "../features/auth/ProductSlice";
function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
 
 // const { isLoading, isSuccess, error, data } = useGetAllProductsQuery();
  useEffect(async () => {
    try {
      const response = await Products().unwrap();
      if (!response.data) {
        throw new Error("Failed to get products");
      }
      console.log(response.data);
      dispatch(setProducts(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchProducts= async()=>{
      const response = await fetch("http://localhost:3001/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(response);
      setProducts(data.data);
      console.log("Products:", data);
    };
    fetchProducts();
},[])
      
  
  // }, []);

  const handlerDeletion = async (id) => {
    const response = await fetch(`http://localhost:3001/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Products
      </h2>

      <Button onClick={() => navigate("create")} className={"ml-4"}>
        Create Product
      </Button>

      <table className="table-auto w-full border-separate border-spacing-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Company</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Details</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{product._id}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.company}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.details}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <ProductUpdate
                    handlerUpdate={() => navigate(`update/${product._id}`)}
                  />
                  <ProductDelete
                    handlerDeletion={() => handlerDeletion(product._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
