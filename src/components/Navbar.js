import React from "react";
import { NavLink,Link,useNavigate} from "react-router-dom";

const Navbar = ({setIsLoggedIn,setIsAdmin,isLoggedIn,isAdmin}) => {
const navigate = useNavigate()
   function handleLogout (){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("admin")
    setIsLoggedIn(false)
    setIsAdmin(false)
    navigate('/')
   }



    return (
       
<nav className="bg-rose-900 select-none ">
  <div className="    md:flex md:justify-between md:items-center lg:items-center lg:justify-center ">
    <div className="flex justify-between items-center ">
        <img src={require('../components/Logo/coffee.png')} className="sm:hidden lg:w-32 lg:inline  " href="#"/>
    </div>

     {/* Here is were we can add more links to the navbar */}
    <div className="flex items-center justify-center w-screen bg-lime-600 ">
    <NavLink to="/" className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >Home
    </NavLink>
      {isAdmin ? (<div className="inline-flex flex-col md:flex-row md:mx-6 gap-x-60  xl:gap-x-40 sm:flex-row justify-center sm:gap-x-20 ">
      <NavLink to='/createProduct' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >Create Product
      </NavLink>
      <NavLink to='/merchantproduct' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >My Products
      </NavLink>
      {/* <NavLink to='/sellerProducts' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >My Products
      </NavLink>  */}
      {/* <button onClick={handleLogout} className="relative bg-yellow-600 px-2 border-2 rounded-md border-black truncate sm:left-1"> "Log Out"</button> */}
      </div>): !isAdmin && isLoggedIn ? (null): 

      <div className="inline-flex flex-col md:flex-row md:mx-6 gap-x-60  xl:gap-x-40 sm:flex-row justify-center sm:gap-x-20 ">
        <NavLink to="/login" className="my-1 text-3xl text-gray-200 font-medium text- hover:text-yellow-600 hover:scale-125  transition duration-400  md:my-0 ">Log In
        </NavLink>
        <NavLink to="/register" className="my-1 text-3xl text-gray-200 font-medium hover:text-yellow-600 hover:scale-125  transition duration-400  md:my-0" >Register
        </NavLink>
      </div>}
          <button onClick={handleLogout} className="relative bg-yellow-600 px-2 border-2 rounded-md border-black truncate sm:left-1"> {isLoggedIn ? "Log Out":"Sign up"}</button>
        {/* This is the cart icon */}
      <div className="inline-flex justify-center relative sm:left-28 lg:left-26 xl:left-32 2xl:left-60  ">
        <Link to='/cart' className="relative text-gray-200 hover:text-yellow-600">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
           {/* This is the blue dot on the cart,IDK if we should change it to a number that displays how many items are in the cart or get rid of it? */}
          <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
          </Link>
      </div>
    </div>
  </div>
</nav>
  


  
    );
  };
  
  export default Navbar;