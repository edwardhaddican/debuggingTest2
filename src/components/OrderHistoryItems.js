import React, { useState, useEffect } from "react";
import {
  getCartItemsbyUserId
} from "../apiAdapter";
import ProductById from "./ProductById";



const OrderHistoryItems = ({orderId}) => {
  
    const [orderItem,setOrderItems] = useState([]);
  
    async function fetchCart() {
        const getOrderItems = await getCartItemsbyUserId(orderId);
        console.log("order history Items got orders", getOrderItems);
        setOrderItems(getOrderItems);
        }
    
      
 const orderItems = orderItem.map((product) => {
    return(
<div key={product.id} className="border-b-2">
    <div className="">
       <ProductById productId={product.productId}/>
        <h1 className='font-semibold underline'>Price:</h1> ${product.price}
    </div>
</div>
    )

  })
  
    useEffect(() => {
  
      fetchCart();
    }, []);
  
  
    return (
      <div>
        {orderItems}
      </div>
    );
  };
  export default OrderHistoryItems;
  