import { userLogin } from "../apiAdapter";
import React, { useState } from "react";

 const Login = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await userLogin(username, password);

    const token = result.token;
    if (result.error) {
      setError(result);
      setIsLoggedIn(false);
    } else if (token) {
      setError(null);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUsername(username);
      setIsLoggedIn(true);
    
  };
}
    return (
      <div>
        {error && error.message ? <h3>{error.message}</h3> : null}
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