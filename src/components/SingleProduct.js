
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { getProductsById, addProductsToCart, getUsersMe2, getAllCartsByUserId } from '../apiAdapter'
const SingleProduct = ({isAdmin}) => {
  const [quantity,setQuantity] = useState(1)
  const [selectedCart, setSelectedCart] = useState([])
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const location = useLocation()
  const {productId} = location.state
console.log(productId, 'id')
  const [getProduct, setGetProduct] = useState([])

  async function fetchCart () {
    const token = localStorage.getItem("token")
    

    // console.log(getUser, 'the user')
      console.log("CREATING CART FOR USER")
      if (token) {
        const getUser = await getUsersMe2(token);
      const getTheCart = await getAllCartsByUserId(token, getUser.id)
      // const getCartItems = await getCartItemsbyUserId(getUser.id);
      // console.log(getCartItems, "SOHW ME THE CART ITEMS");
      console.log(getTheCart, 'cart')
      setSelectedCart(getTheCart)
      }
    
  }
  async function fetchProductId () {
 
   const getTheProduct = await getProductsById(productId)
   setGetProduct(getTheProduct)
 }
console.log(getProduct, 'the product')
 useEffect(()=> {
     fetchProductId();
     fetchCart()
 }, [])

 async function handleSubmit() {


 
  const token = localStorage.getItem("token");
 

 const addedCartProduct = await addProductsToCart(productId, selectedCart.id, quantity, getProduct.price)

  if (addedCartProduct.error) {
    setError(addedCartProduct);
  } else {
    setError(null);
    setCart(addedCartProduct);
    // navigate("./");
  }
}

  return (
    <section className="text-2xl font-normal body-font overflow-hidden select-none bg-gradient-to-t from-rose-300 to-yellow-600 w-screen h-screen flex justify-center items-center ">
  <div className="container px-5 py-24 mx-auto bg-black bg-opacity-50 rounded-md shadow-2xl">
    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
        <h2 className="text-sm title-font text-white  tracking-widest">BRAND NAME </h2>
        <h1 className="text-white text-3xl title-font font-medium mb-4">{getProduct.name}</h1>
        <div className="flex mb-4">
          <p className="flex-grow text-white border-b-2 border-yellow-600 py-2 text-lg px-1">Description</p>
        </div>
        <p className="leading-relaxed mb-4 text-white ">{getProduct.description}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Roast</span>
          <span className="ml-auto  text-white">{getProduct.roast}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Grind</span>
          <span className="ml-auto text-white">{getProduct.grind}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Weight</span>
          <span className="ml-auto  text-white">{getProduct.weight}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Country</span>
          <span className="ml-auto  text-white">{getProduct.country}</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-white ">Quantity</span>
          <input type="number" min="1" value={quantity} onChange={(event)=> {setQuantity(event.target.value)}} className="  ml-auto text-black rounded-md w-20 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 focus:ring-2 "/>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-white">Price: ${getProduct.price}</span>
          {isAdmin ? null :
          <button onClick={() => handleSubmit(productId)} className="flex ml-auto text-rose-900 bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-rose-900 hover:text-yellow-600 rounded transition duration-300 font-medium">Add To Cart</button>
}
        </div>
      </div>
      <img  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-md" src={require('./Logo/coffeeBag.jpg')}/>
    </div>
  </div>
</section>
  )
}

export default SingleProduct

