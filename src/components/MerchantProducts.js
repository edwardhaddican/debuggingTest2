import React, { useState, useEffect } from 'react'
import { getProductsByAdmin,getUsersMe } from '../apiAdapter'
import {DeleteProduct, UpdateProducts} from './index'




 const MerchantProducts  = ({productsList, setProductsList}) => {
const [myProducts, setMyProducts] = useState([])
const [isShown2, setIsShown2] = useState(false)
async function fetchMyProducts() {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const user = await getUsersMe(token)
  if (user.username === username) {
    const allMyProducts = await getProductsByAdmin(username)
    console.log(allMyProducts,"Show me the products line 17")
    setMyProducts(allMyProducts)
  }
}
async function buttonClick2() {
  setIsShown2((current) => !current);
}

useEffect(() => {
  fetchMyProducts()
}, []);

const showMyProducts = myProducts.map((product, index) => {
  return (
    <div key={index} className=''>
      <h1> {product.name}</h1>
      <DeleteProduct myProducts={myProducts} setMyProducts={setMyProducts} productId={product.id}/>
      <button onClick={buttonClick2}>EDIT PRODUCT</button>
                  {isShown2 && (
                    <UpdateProducts
                    myProducts={myProducts} setMyProducts={setMyProducts} productId={product.id}
                    />
                  )}
    </div>
  )
})

  return (
    <div>
      {showMyProducts}

    </div>
  )
}

export default MerchantProducts