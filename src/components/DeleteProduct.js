import { getProducts, removeProduct } from "../apiAdapter";
import React, { useEffect } from "react";


const DeleteProduct = ({ productsList, setProductsList, productId  }) => {
    async function handleDelete(event) {
      event.preventDefault();
      const token = localStorage.getItem("token");
      await removeProduct(token, productId);
      const newMyProducts = await getProducts();
      setProductsList(newMyProducts);
    }
  
    useEffect(() => {}, [productsList]);
    return (
      <div onClick={handleDelete}>
        <button type="submit" id="deleteProduct">
          DELETE
        </button>
      </div>
    );
  };
  
  export default DeleteProduct;