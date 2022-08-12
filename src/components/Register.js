import {registerUser} from '../apiAdapter'
import React, { useState,useRef } from "react";
import { Link} from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid';
import '../input.css';



const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const usernameRef = useRef();
  
    const handleSubmit = async (event) => {
      try {
        if(username || password !== '', password.length > 7) {
          event.preventDefault();
          alert(`Thanks for signing up ${usernameRef.current.value}!`);
        const token = await registerUser(username, password);
        localStorage.setItem("token", token);
        
        }else {
          alert("Please enter a Username and Password!")
        }
       } catch (error) {
        alert(error);
      }
    };
  
    return (
      <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-gradient-to-t from-rose-300 to-yellow-600">
      <div className="max-w-md w-full space-y-8" >
        <div >
          <div>
            <img
              className="mx-auto h-29 w-auto rounded-lg shadow-gray-700 shadow-md "
              src={require('../components/Logo/coffee.png')}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up </h2>
            <p className="mt-2 text-center text-md text-gray-900">
              Or{' '}
              <Link to={'/login'} className="font-medium text-rose-900 hover:text-yellow-600">
                Click here to Log in
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="Name"
                  name="full-name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Name"
                />
              </div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md my-8 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Email Address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  className="mt-8 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Confirm Password"
                />
              </div>
    
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-gray-700 shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  <LockClosedIcon className="h-5 w-5 text-yellow-600  group-hover:text-rose-900" aria-hidden="true" />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  };

  export default Register