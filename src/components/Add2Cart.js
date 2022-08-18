import React, { useState, useEffect } from "react";
import { addProductsToCart, getAllCarts, getUsersMe} from "../apiAdapter";
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
  
  async function fetchCart () {
    const token = localStorage.getItem("token")
    const getUser = await getUsersMe(token);
    console.log(getUser.id, "Userbefore creating cart")
    if(!getUser){
      console.log("NO USER HERE, creating cart")
      await getAllCarts()
    }else{
      console.log("CREATING CART FOR USER")
      await getAllCarts(getUser.id)
      console.log(await getAllCarts(getUser.id),"Finished creating cart")
    }
    console.log(getUser,"SHOW ME THE USer")}
   
    
    useEffect(()=> {
    fetchCart()
    }, [])
 
  // async function handleSubmit() {
    
  //   const token = localStorage.getItem("token");
   
  //  const addedCartProduct = await addProductsToCart(productId, , quantity, price)
  // //  console.log(selectedCart[0], "show me the money")
  // //   console.log(addedCartProduct, "Show me more stuff")
  // //   if (addedCartProduct.error) {
  //     setError(addedCartProduct);
  //   } else {
  //     setError(null);
  //     setCart(addedCartProduct);
  //     navigate("./");
  // //   }
  // }



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