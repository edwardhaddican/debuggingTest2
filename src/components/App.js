
import React, {useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {Login,Register, Product,Navbar,Cart,CreateProduct} from '.'


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
    <div>
      <Navbar />
    </div>
    <Routes>
       <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/homePage' element={<Product productsList={productsList}
        setProductsList={setProductsList}/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/createProduct' element={<CreateProduct productsList={productsList}
        setProductsList={setProductsList} />}/>
    </Routes>

    </div>
  );
};

export default App;

