
import React, {useState} from 'react'


const SingleProduct = () => {
  const [quantity,setQuantity] = useState(1)
  return (
    <section className="text-black text-xl font-medium body-font overflow-hidden select-none bg-gradient-to-t from-rose-300 to-yellow-600 w-screen h-screen flex justify-center items-center ">
  <div className="container px-5 py-24 mx-auto bg-black bg-opacity-50 rounded-md shadow-2xl">
    <div className="lg:w-4/5 mx-auto flex flex-wrap ">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
        <h2 className="text-sm title-font text-white  tracking-widest">BRAND NAME</h2>
        <h1 className="text-white text-3xl title-font font-medium mb-4">Animated Night Hill Illustrations</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-white border-b-2 border-yellow-600 py-2 text-lg px-1">Description</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-white">Reviews</a>
        </div>
        <p className="leading-relaxed mb-4 text-white ">Robust roast robust caffeine, mazagran, wings aftertaste french press cinnamon saucer dripper. That french press, and brewed fair trade cup steamed rich. Viennese trifecta doppio at body dripper coffee siphon blue mountain.</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Roast</span>
          <span className="ml-auto  text-white">Blue</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Grind</span>
          <span className="ml-auto text-white">Medium</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Weight</span>
          <span className="ml-auto  text-white">Blue</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-white ">Country</span>
          <span className="ml-auto  text-white">Blue</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-white ">Quantity</span>
          <input type="number" min="1" value={quantity} onChange={(event)=> {setQuantity(event.target.value)}} className="  ml-auto text-black rounded-md w-20 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 focus:ring-2 "/>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-white">$58.00</span>
          <button className="flex ml-auto text-rose-900 bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-rose-900 hover:text-yellow-600 rounded transition duration-500">Add To Cart</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-md" src={require('./Logo/coffeeBag.jpg')}/>
    </div>
  </div>
</section>
  )
}

export default SingleProduct

