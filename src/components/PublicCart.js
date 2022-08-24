import React, {useEffect, useState} from 'react'
import {DeletePublicItem} from './index';


const PublicCart = ({isLoggedIn}) => {

    const [guestCart, setGuestCart] = useState([])

    useEffect(() => {
        if (!isLoggedIn) {
          console.log('start')
          let prevItem =  JSON.parse(localStorage.getItem('cart'))
          console.log(prevItem, 'item')
          setGuestCart(prevItem)
        }
        
      }, []);

  
console.log(guestCart, 'guest')

      const myCart = guestCart.map((cartItem) => {
   

        return(

          <div key={cartItem.id} className=" select-none">
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
                        {/* <ProductById productId={cartItem.productId} /> */}
                      </p>
                    </div>
                  </div>
                  {/* <UpdateCartItem cartItemId={cartItem.id} setCartItems={setCartItems}/> */}
                  <div>
                    <p className="text-xl font-medium">
                      ${cartItem.price} 
                    </p>
                  </div>
                      
                      <DeletePublicItem cartItemId={cartItem.id} setGuestCart={setGuestCart} guestCart={guestCart}/>
                </li>
              </ul>
            </div>

          </div>
        </div>
      );
    });



    return (
        <section className=" flex shrink-0 justify-center items-center h-screen bg-gradient-to-t from-rose-300 to-yellow-600 ">

      <div className="relative w-full max-w-screen-2xl shadow-2xl  ">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="py-12 bg-gray-100 bg-opacity-80 md:py-24 rounded-l-lg  ">
            <div className="max-w-full px-4 mx-auto lg:px-4 ">
              <div className="flex items-center justify-center">
                <img
                  src={require("../components/Logo/coffee.png")}
                  className="w-20 h-20 rounded-full"
                />
                  
                <h2 className="ml-4 font-medium">Warp Coffee</h2>
              </div>

              <div className="mt-8">
               
                <p className="mt-1 text-lg text-black">
                  For the purchase of  
                </p>
              </div> 
            {myCart}
           

                {/* <Sum cartItems={cartItems}/>

                <CartCheckout/> */}
                

            </div>
          </div>

          <div className="py-12 bg-white bg-opacity-80 md:py-24 rounded-r-lg">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label
                    className="block mb-1 text-md text-gray-600"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>

                  <input
                    className="rounded-lg shadow-md border-gray-200 w-full text-sm p-2.5"
                    type="text"
                    id="first_name"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    className="block mb-1 text-md text-gray-600"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>

                  <input
                    className="rounded-lg shadow-md border-gray-200 w-full text-sm p-2.5"
                    type="text"
                    id="last_name"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-md text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-md p-2.5"
                    type="email"
                    id="email"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-md text-gray-600"
                    htmlFor="phone"
                  >
                    Phone
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-gray-200 w-full text-md p-2.5"
                    type="tel"
                    id="phone"
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-md text-gray-600">
                    Card Details
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="card-number">
                        Card Number
                      </label>

                      <input
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        name="card-number"
                        id="card-number"
                        placeholder="Card number"
                      />
                    </div>

                    <div className="flex -space-x-px">
                      <div className="flex-1">
                        <label className="sr-only" htmlFor="card-expiration-date">
                          Expiration Date
                        </label>

                        <input
                          className="border-gray-200 relative rounded-bl-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          name="card-expiration-date"
                          id="card-expiration-date"
                          placeholder="MM / YY"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="sr-only" htmlFor="card-cvc">
                          CVC
                        </label>

                        <input
                          className="border-gray-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                          type="text"
                          name="card-cvc"
                          id="card-cvc"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block mb-1 text-sm text-gray-600">
                    Billing Address
                  </legend>

                  <div className="-space-y-px bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="sr-only" htmlFor="country">
                        Country
                      </label>

                      <select
                        className="border-gray-200 relative rounded-t-lg w-full focus:z-10 text-sm p-2.5"
                        id="country"
                        name="country"
                        autoComplete="country-name"
                      >
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="postal-code">
                        ZIP/Post Code
                      </label>

                      <input
                        className="border-gray-200 relative rounded-b-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400"
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        placeholder="ZIP/Post Code"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button
                    className="rounded-lg bg-black text-sm p-2.5 text-white w-full block animate-bounce"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

    
}

export default PublicCart