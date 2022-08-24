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
    
      
 const orderItems = orderItem.map((product, index) => {
    return(
<div key={product.id}>
    <div>
       <ProductById productId={product.id}/>
    </div>
    <div>
        {product.price}
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
  