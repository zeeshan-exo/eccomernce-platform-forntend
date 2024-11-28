import { useState } from "react"

function DeleteProduct(){
       const {productID, setProductID} = useState("")

       const handleSubmit= async(e)=>{
        console.log ("form submit:", {productID})

        const response = await fetch("http://localhost:3001/api/product/:id", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
            },
      
            body: JSON.stringify({ name, email, password }),
          });

          if (!response.ok) {
            throw new Error("Failed to delete Product");
          }
      
          const data = await response.json();
      
          console.log("User signed up successfully:", data);
        }      
    return(
         <>
            onSubmit={handleSubmit}
         </>
    )
}
export default DeleteProduct