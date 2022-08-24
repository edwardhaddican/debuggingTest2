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
      <div key={order.id} className="select-none">
        <div className="mt-12">
          <div className="flow-root">
            <ul className=" rounded-lg border-2 border-black shadow-xl bg-slate-600 bg-opacity-20">
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
    <section className=" flex justify-center items-center h-screen  bg-gradient-to-t from-rose-300 to-yellow-600 select-none px-4">
      <div className=" w-full shadow-2xl border bg-gray-300 rounded-lg">
        <div className="grid grid-cols-1">
          <div className="  bg-opacity-80 md:py-24 container mx-auto ">
            <div className="max-w-full px-4 mx-auto lg:px-4 ">
              <div className="flex items-center justify-center">
               

                <h2 className="ml-4 font-medium">Warp Coffee</h2>
              </div>

              <div className="mt-8">
                
                <p className="mt-1 text-lg text-black">Purchase History:</p>
              </div>
              {item}

            
            </div>
          </div>

          <div className="col-span-6">
           
          </div>
        </div>
      </div>
    </section>
  );
};
export default OrderHistory;
