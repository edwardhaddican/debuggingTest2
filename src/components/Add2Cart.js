import React, { useState } from "react";
import { addProductToCart} from "../apiAdapter";
import { useNavigate } from "react-router-dom";

const AddProductToCart = ({ productsList, setProductsList, productId }) => {
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(productsList, "HELLO ADD PRODUCTS")
   const addedCartProduct = await addProductToCart(productId, orderId, price, quantity)
    if (addedCartProduct.error) {
      setError(addedCartProduct);
    } else {
      setError(null);
      await setProductsList([productsList,...addedCartProduct]);
      navigate("./");
    }
  }



  return (
    <div className="products-container">
      <div key={productId}>
        <h3>{productsList.name}</h3>
        <p>${productsList.price}</p>
        <p>{productsList.description}</p>
        <p>{productsList.country}</p>
              <button onClick={() => handleSubmit(productId)}>
                Add to Cart
              </button>
      </div>
    </div>
  );
};
export default AddProductToCart;