import {registerUser} from '../apiAdapter'
import React, { useState,useRef } from "react";



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
      <div className="box" id="loginBox">
        <form  onSubmit={handleSubmit}>
          <label className="username"> 
        <h3 >REGISTER</h3>
            <input
            
              id="username"
              type="text"
              placeholder="enter a username"
              ref={usernameRef}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label className="password" >
            <input
            
              type="password"
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
   
          <button  type="submit">Register</button>
        </form>
      </div>
    );
  };

  export default Register