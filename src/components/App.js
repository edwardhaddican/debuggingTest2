
import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import {Login,Register, Product,Navbar,Cart} from '.'


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
       <Route path='/login' element={<Login />}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/homePage' element={<Product productsList={productsList}
        setProductsList={setProductsList}/>}/>
        <Route path='/cart' element={<Cart />}/>
    </Routes>

    </div>
  );
};

export default App;

