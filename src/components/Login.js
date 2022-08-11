import { userLogin } from "../apiAdapter";
import React, { useState } from "react";

 const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const token = await userLogin(username, password);
        localStorage.setItem("token", token);
        console.log(token);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                value={password}
                placeholder="enter a password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
            <div>
              
            </div>
          </form>
      </div>
    );
  };
export default Login