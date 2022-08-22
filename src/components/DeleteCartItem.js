import { removeCartItem, getCartItemsbyUserId, getUsersMe2 } from "../apiAdapter";
import React, {useEffect} from 'react'

const DeleteCartItem = ({setCartItems, cartItems, cartItemId}) => {


    async function handleDelete(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const username = localStorage.getItem('username')
        const getUser = await getUsersMe2(token);
        await removeCartItem(cartItemId, token);
        const newMyCartItems = await getCartItemsbyUserId(getUser.id);
        setCartItems(newMyCartItems);
      }
    
      useEffect(() => {}, [cartItems]);
    return (
        <div className="">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-rose-900 font-medium py-0 px-1 rounded-3xl relative bottom-7 right-2 hover:animate-pulse" 
                   onClick={handleDelete}>X</button>
        </div>
    )
}

export default DeleteCartItem