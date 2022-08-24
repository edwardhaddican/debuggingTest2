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




  const item = cart.map((order, index) => {
    return (
      <div key={order.id} className=" select-none">
        <div className="mt-12">
          <div className="flow-root">
            <ul className="-my-4 rounded-lg border-2 border-black shadow-xl ">
              <li className="flex items-center justify-between py-4">
                <div className="flex items-start ">
                  <img
                    className="flex-shrink-0 object-cover w-16 h-16 rounded-lg shadow-lg "
                    src={require("./Logo/coffeeBag.jpg")}
                  />
                  <div className="ml-4">
                    <p className="text-md">
                    Order # {order.id}
                    </p>
                  </div>
                <OrderHistoryItems orderId={order.id}/>
                </div>
                  
                <div>
                  <p className="text-xl font-medium">Order User:{cartItem.userId}</p>
                </div>


              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className=" flex shrink-0 justify-center items-center h-screen bg-gradient-to-t from-rose-300 to-yellow-600 select-none">
      <div className="relative w-full max-w-screen-2xl shadow-2xl  ">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="py-12 bg-gray-100 bg-opacity-80 md:py-24 rounded-l-lg  ">
            <div className="max-w-full px-4 mx-auto lg:px-4 ">
              <div className="flex items-center justify-center">
               

                <h2 className="ml-4 font-medium">Warp Coffee</h2>
              </div>

              <div className="mt-8">
                
                <p className="mt-1 text-lg text-black">For the purchase of</p>
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
