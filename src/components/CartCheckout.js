import { getAllCartsByUserId, getUsersMe2, userCartCheckout} from "../apiAdapter";
import React, { useEffect } from "react";


const CartCheckout = ({ carts, setCarts}) => {
    async function handleCheckout(event) {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const getUser = await getUsersMe2(token);
      console.log(getUser, "Show me the user for Cart Checkout")
      const getCart = await getAllCartsByUserId(token, getUser.id)
      console.log("New Cart", getCart)
       await userCartCheckout(token, getCart.id);
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