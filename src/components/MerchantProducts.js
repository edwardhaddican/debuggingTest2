import React, { useState, useEffect } from 'react'
import { getProductsByAdmin,getUsersMe } from '../apiAdapter'
import {DeleteProduct} from './index'



 const MerchantProducts  = ({productsList, setProductsList}) => {
const [myProducts, setMyProducts] = useState([])
async function fetchMyProducts() {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const user = await getUsersMe(token)
  if (user.username === username) {
    const allMyProducts = await getProductsByAdmin(username)
    setMyProducts(allMyProducts)
  }
}

useEffect(() => {
  fetchMyProducts()
}, []);

const showMyProducts = myProducts.map((product, index) => {
  return (
    <div>
      <h1> {product.name}</h1>
      <DeleteProduct myProducts={myProducts} setMyProducts={setMyProducts} productId={product.id}/>
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