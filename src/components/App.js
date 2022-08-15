
import React, {useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {Login,Register, Product,Navbar,Cart,CreateProduct,MerchantLogin,MerchantRegister} from '.'


const App = () => {
  const [productsList, setProductsList] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} />
    </div>
    {isLoggedIn && isAdmin ? (
      <Routes> 
          <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>} />
          <Route path='/cart' element={<Cart />}/> 
          <Route path='/createProduct' element={<CreateProduct productsList={productsList} setProductsList={setProductsList} />}/>
       </Routes> ) : 
       !isAdmin && isLoggedIn ? (
        <Routes>  
              <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}/>
              <Route path='/cart' element={<Cart />}/>
       </Routes>) : (  
        <Routes>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/register' element={<Register />}/>
            <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/createProduct' element={<CreateProduct productsList={productsList} setProductsList={setProductsList} />}/>
            <Route path='/adminLogin' element={<MerchantLogin setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}/>
            <Route path='/adminRegister' element={<MerchantRegister setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}/>}/>
        </Routes>) 
       
  }
      
    
    </div>
  );
};

export default App;

