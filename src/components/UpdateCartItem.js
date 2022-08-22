import React, { useState, useEffect } from "react";
import { editCartItemsbyId, getCartItemsbyUserId,getUsersMe2 } from "../apiAdapter";

const UpdateCartItem =({cartItems,setCartItems,cartItemId})=>{
    const [cartQuantity,setCartQuantity] = useState(1);

  async function handleSubmit (event) {
    event.preventDefault()
    const token = localStorage.getItem("token");
    const getUser = await getUsersMe2(token);
    console.log(cartItemId, "Show me the cart ID")
    // const editCartItemQuantity = await editCartItemsbyId(token, cartItemId, cartQuantity)
      const newEditedCartItem = await  getCartItemsbyUserId(getUser.id);

      setCartItems(newEditedCartItem);
    
    }
    
    useEffect(() => {}, []);
    
    return(
        <div >
      <form  
            onSubmit={handleSubmit}>
              <label>
          quantity
          <input className="  ml-auto text-black rounded-md w-16 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 focus:ring-2"
            type="number"
            min="1" 
            value={cartQuantity}
            onChange={(event) => {
              setCartQuantity(event.target.value);
            }}
          />
         
        </label>
         </form>
        </div>
    )}
export default UpdateCartItem;