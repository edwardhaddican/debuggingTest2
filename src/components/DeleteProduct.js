import { getProducts, getProductsByAdmin, removeProduct } from "../apiAdapter";
import React, { useEffect } from "react";


const DeleteProduct = ({ myProducts, productId, setMyProducts }) => {
    async function handleDelete(event) {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const username = localStorage.getItem('username')
      await removeProduct(token, productId);
      const newMyProducts = await getProductsByAdmin(username);
      setMyProducts(newMyProducts);
    }
  
    useEffect(() => {}, [myProducts]);
    return (
      <div onClick={handleDelete}>
        <button type="submit" id="deleteProduct">
          DELETE
        </button>
      </div>
    );
  };
  
  export default DeleteProduct;