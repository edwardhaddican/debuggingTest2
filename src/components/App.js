import React, {useState} from "react";
import {Login,Register, Product} from '.'



const App = () => {
  const [productsList, setProductsList] = useState([])
  return (
    <div>
      <Login />
      <Register />
      <Product
       productsList={productsList}
        setProductsList={setProductsList} />
    </div>
  );
};

export default App;