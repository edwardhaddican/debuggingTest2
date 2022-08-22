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
        <div>
          <button className="ml-5 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-2 border-b-2 border-yellow-700 hover:border-yellow-500 rounded" 
                   onClick={handleDelete}>remove</button>
        </div>
    )
}

export default DeleteCartItem