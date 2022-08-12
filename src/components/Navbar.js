import React from "react";
import { NavLink,Link} from "react-router-dom";

const Navbar = () => {
    return (
       
<nav className="bg-rose-900 select-none">
  <div className="container mx-auto  py-3 md:flex md:justify-between md:items-center">
    <div className="flex justify-between items-center">
      <div className="">
        <a className="text-gray-200 text-xl font-bold md:text-2xl hover:text-yellow-600 transition duration-400" href="#">Warp Coffee</a>
      </div>

    
      <div className="flex md:hidden">
        <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
          </svg>
        </button>
      </div>
    </div>

     {/* Here is were we can add more links to the navbar */}
    <div className="md:flex items-center justify-center w-screen  ">
      <div className="flex flex-col md:flex-row md:mx-6 gap-x-60  ">
        <NavLink to="/" className="my-1 text-3xl text-gray-200 font-medium md:mx-4 hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" href="#">Home
        </NavLink>
        <NavLink to="/login" className="my-1 text-3xl text-gray-200 font-medium hover:text-yellow-600 hover:scale-125  transition duration-400 md:mx-4 md:my-0" href="#">Log In
        </NavLink>
        <NavLink to="/register" className="my-1 text-3xl text-gray-200 font-medium hover:text-yellow-600 hover:scale-125  transition duration-400 md:mx-4 md:my-0" href="#">Register
        </NavLink>
      </div>

        {/* This is the cart icon */}
      <div className="flex justify-center md:block relative left-60 ">
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