import React, { useState, useEffect } from "react";
import { addProductsToCart, getAllCarts} from "../apiAdapter";
import { useNavigate } from "react-router-dom";

const AddProductToCart = ({ productsList, setProductsList, productId }) => {
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState([])
  const [selectedCart, setSelectedCart] = useState([])
  const [error, setError] = useState (null)
  const [carts, setCarts] = useState([])
  const navigate = useNavigate();
  
  async function fetchCarts () {
    const fetchTheCarts = await getAllCarts()
    setSelectedCart([fetchTheCarts[0].id])
    setCarts(fetchTheCarts)
    }
    
    useEffect(()=> {
    fetchCarts()
    }, [])
 
  async function handleSubmit() {
    
    const token = localStorage.getItem("token");
    console.log(productsList, "HELLO ADD PRODUCTS")
   const addedCartProduct = await addProductsToCart(productId, selectedCart[0], quantity, price)
    if (addedCartProduct.error) {
      setError(addedCartProduct);
    } else {
      setError(null);
      setCart(addedCartProduct);
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