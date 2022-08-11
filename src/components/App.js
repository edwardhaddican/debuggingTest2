import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Login,Register, Product} from '.'
import CreateProduct from "./CreateProduct";



const App = () => {
  const [productsList, setProductsList] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      
      <Login setIsLoggedIn={setIsLoggedIn}/>
      <Register />
      <Product
       productsList={productsList}
        setProductsList={setProductsList}/>
      <Routes>
        <Route path='/CreateProduct'
        element={<CreateProduct productsList={productsList} setProductsList={setProductsList}/>}/>
        </Routes>
    </div>
  );
};

export default App;