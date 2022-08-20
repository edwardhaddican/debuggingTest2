import React, { useState, useEffect } from "react";
import { editCartItemsbyId, getCartItemsbyUserId,getUsersMe2 } from "../apiAdapter";

const UpdateCartItem =({cartItems,setCartItems,cartItemId})=>{
    const [cartQuantity,setCartQuantity] = useState(0);

  async function handleSubmit (event) {
    event.preventDefault()
    const token = localStorage.getItem("token");
    const getUser = await getUsersMe2(token);
    console.log(cartItemId, "Show me the cart ID")
    const editCartItemQuantity = await editCartItemsbyId(token, cartItemId, cartQuantity)
    if (editCartItemQuantity.error) {
      setError(editCartItemQuantity);
    } else {
      setError(null);
      editCartItemQuantity;
      const newEditedCartItem = await  getCartItemsbyUserId(getUser.id);

      setCartItems(newEditedCartItem);
    
    }
    }
    useEffect(() => {}, []);
    
    return(
        <div>
      <form className="flex flex-row" onSubmit={handleSubmit}>
              <label>
          quantity
          <input
            type="text"
            value={cartQuantity}
            onChange={(event) => {
              setCartQuantity(event.target.value);
            }}
          />
         
        </label>
         </form>
        </div>
    )
}
export default UpdateCartItem;