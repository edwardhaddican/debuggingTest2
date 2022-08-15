import { merchantLogin } from "../apiAdapter";
import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid';
import '../input.css';
import Login from "./Login";

 const MerchantLogin = ({setIsLoggedIn,setIsAdmin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const result = await merchantLogin(username, password);
        const token =result.token
        
        if(result.error){
          setError(result)
          setIsLoggedIn(false)
        }else if(token){ 
          setError(null)
          const username = result.merchant.username
          const admin = result.merchant.Admin
          localStorage.setItem("token", token);
          localStorage.setItem("username",username);
          localStorage.setItem("admin",admin);
          setIsLoggedIn(true)
          setIsAdmin(true)
          navigate('../')
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className=" h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-rose-300 to-yellow-600">
      <div className="max-w-md w-full space-y-8" >
        <div >
          <div>
            <img
              className="mx-auto h-29 w-auto rounded-lg shadow-gray-700 shadow-md select-none "
              src={require('../components/Logo/coffee.png')}
              alt="Workflow"

            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">Admin Sign in </h2>
            <p className="mt-2 text-center text-md text-gray-900">
              Or{' '}
              <Link to={'/adminRegister'} className="font-medium text-rose-900 hover:text-yellow-600">
                Click here to Register as an Admin 
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                  id="username"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm "
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-lg"
                  placeholder="Password"
                />
                {error && error.message ? <h3>{error.message}</h3> : null}
              </div>
            </div>

            <div className="flex items-center justify-between">
        
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-gray-700 shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  <LockClosedIcon className="h-5 w-5 text-yellow-600  group-hover:text-rose-900" aria-hidden="true" />
                </span>
                Sign in
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  };

export default MerchantLogin