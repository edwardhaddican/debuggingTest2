
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { getProductsById, addProductsToCart, getUsersMe2, getAllCartsByUserId } from '../apiAdapter'
const SingleProduct = ({isAdmin, isLoggedIn}) => {
  const [quantity,setQuantity] = useState(1)
  const [selectedCart, setSelectedCart] = useState([])
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [guestCart, setGuestCart] = useState([])
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
  if (!isLoggedIn) {
    fetchProductId()
    console.log(guestCart, 'guest')
          localStorage.setItem('cart', JSON.stringify(guestCart))
       
        console.log(guestCart,'the cart')
        }
     fetchProductId();
     fetchCart()
 }, [guestCart])

 async function handleSubmit() {


 
  const token = localStorage.getItem("token");
 if (token) {

 const addedCartProduct = await addProductsToCart(productId, selectedCart.id, quantity, getProduct.price)

  if (addedCartProduct.error) {
    setError(addedCartProduct);
  } else {
    setError(null);
    setCart(addedCartProduct);
    // navigate("./");
  }
} else {
  console.log(getProduct, 'The prod')
  const newProd = [].concat(getProduct)
  console.log(newProd, 'kkkok')
  

  newProd.forEach(object => {
    object.quantity = 1;
  })

  console.log(newProd, 'the new')
  setGuestCart(newProd)
  console.log(guestCart, 'guest cart')

  



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

          <a className="flex-grow text-white border-b-2 border-yellow-600 py-2 text-lg px-1">Description</a>
         

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

<div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Price</span>
          <span className="ml-auto  text-white">${getProduct.price}</span>
          </div>
          {isAdmin ? null :
        <div className="flex">
          
          <button onClick={() => handleSubmit(productId)} className="flex ml-auto text-rose-900 bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-rose-900 hover:text-yellow-600 rounded transition duration-500">Add To Cart</button>


        </div>
}
      </div>
      <img  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-md" src={require('./Logo/coffeeBag.jpg')}/>
    </div>
  </div>
</section>
  )
}

export default SingleProduct

