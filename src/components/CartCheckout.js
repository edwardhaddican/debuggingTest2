import { getAllCartsByUserId, getUsersMe2, userCartCheckout} from "../apiAdapter";
import React, { useEffect } from "react";


const CartCheckout = ({ carts, setCarts}) => {
    async function handleCheckout(event) {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const getUser = await getUsersMe2(token);
      console.log(getUser, getUser.id, "Show me the user for Cart Checkout")
       await userCartCheckout(token, getUser.id);
    }
 
    useEffect(() => {handleCheckout}, []);
    return (
      <div onClick={handleCheckout}>
        <button type="submit" id="checkout">
          CHECKOUT
        </button>
      </div>
    );
  };
  
  export default CartCheckout;