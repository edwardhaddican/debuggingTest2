
import React, {useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {Login,Register, Product,Navbar,Cart,CreateProduct,MerchantLogin,MerchantRegister, MerchantProducts} from '.'



const App = () => {
  const [productsList, setProductsList] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [carts,setCarts] = useState([])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } 
    if (localStorage.getItem("admin")){
      setIsAdmin(true)
    }
  }, []);
  return (
    <div>
    <div>
    
      <Navbar setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
    </div>
    {isLoggedIn && isAdmin ? (
      <Routes> 
          <Route path ='/merchantproduct' element ={<MerchantProducts />}/>
          <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin} carts={carts} setcarts={setCarts}/>} />
          <Route path='/cart' element={<Cart carts={carts} setcarts={setCarts}/>}/> 
          <Route path='/createProduct' element={<CreateProduct productsList={productsList} setProductsList={setProductsList} />} />
       </Routes> ) : 
       !isAdmin && isLoggedIn ? (
        <Routes>  
              <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin} carts={carts} setcarts={setCarts}/>}/>
              <Route path='/cart' element={<Cart />}/>
       </Routes>) : (  
        <Routes>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/register' element={<Register />}/>
            <Route exact path='/' element={<Product productsList={productsList} setProductsList={setProductsList} isLoggedIn={isLoggedIn} isAdmin={isAdmin} carts={carts} setcarts={setCarts}/>}/>
            <Route path='/cart' element={<Cart carts={carts} setcarts={setCarts}/>}/>
            <Route path='/adminLogin' element={<MerchantLogin setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}/>
            <Route path='/adminRegister' element={<MerchantRegister setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin}/>}/>
        </Routes>) 
       
  }
      
    
    </div>
  );
};

export default App;

