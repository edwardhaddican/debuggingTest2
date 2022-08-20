import React, { useState, useEffect } from "react";

import { addProductsToCart, getAllCartsByUserId, getUsersMe2, getCartItemsbyUserId} from "../apiAdapter";

import { useNavigate } from "react-router-dom";


const AddProductToCart = ({ productsList, setProductsList, productId,productPrice }) => {
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState([])
  const [selectedCart, setSelectedCart] = useState([])
  const [error, setError] = useState (null)
  const [carts, setCarts] = useState([])
  const navigate = useNavigate();
  
  async function fetchCart () {
    const token = localStorage.getItem("token")
    

    // console.log(getUser, 'the user')
      console.log("CREATING CART FOR USER")
      if (token) {
        const getUser = await getUsersMe2(token);
      const getTheCart = await getAllCartsByUserId(token, getUser.id)
      const getCartItems = await getCartItemsbyUserId(getUser.id);
      console.log(getCartItems, "SOHW ME THE CART ITEMS");
      console.log(getTheCart, 'cart')
      setSelectedCart(getTheCart)
      }
    
  }
    
  
    
    useEffect(()=> {
    fetchCart()
    }, [])
    
  
  
  
  async function handleSubmit() {


 
    const token = localStorage.getItem("token");
   

   const addedCartProduct = await addProductsToCart(productId, selectedCart.id, quantity, productPrice)

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
     
              <button onClick={() => handleSubmit(productId)}>
                Add to Cart
              </button>
    </div>
  );
};
export default AddProductToCart;