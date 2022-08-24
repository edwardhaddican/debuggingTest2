import React, { useState, useEffect } from "react";
import {
  getUsersMe2,
    getOrderHistorybyUserId,
} from "../apiAdapter";
import OrderHistoryItems from "./OrderHistoryItems";

const OrderHistory = ({isLoggedIn}) => {
  const [cart, setCart] = useState([]);
  const [cartItem,setCartItems] = useState([]);

  async function fetchCart() {
    const token = localStorage.getItem("token");
    if (token) {
      const getUser = await getUsersMe2(token);
      console.log("order history User", getUser);
      const getCart = await getOrderHistorybyUserId(token, getUser.id);
      console.log("order history got orders", getCart);
      // const getCartItems = await getCartItemsbyUserId(getCart.id);
      setCart(getCart);
      console.log("ORDER HISTORY", cart)
      }
    }
    


  useEffect(() => {

    fetchCart();
  }, []);




  const item = cart.map((order) => { 
    return (
      <div key={order.id} className="select-none bg-gray-400">
        <div className="mt-12 ">
          <div className="flow-root">
            <ul className="rounded-lg border-2 border-black shadow-xl bg-opacity-20">
              <li className="flex items-center py-4 ">
                <div className="  w-full basis-1/6">
                <div className=" ">
                    <p className="text-xl font-semibold text-center">
                    Order {order.id}
                    </p>
                </div>
                </div>
                <div className=" basis-5/6">
                  <OrderHistoryItems orderId={order.id}/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className=" flex flex-col bg-gradient-to-t from-rose-300 to-yellow-600 select-none px-4 h-screen justify-center">
      <div className="h-4/6 shadow-2xl border bg-gray-500 rounded-lg overflow-y-scroll">
              {item}
      </div>
    </section>
  );
};
export default OrderHistory;
