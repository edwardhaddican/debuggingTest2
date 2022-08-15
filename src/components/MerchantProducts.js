import React, { useState, useEffect } from 'react'
import { getProductsByAdmin,getUsersMe } from '../apiAdapter'




 const MerchantProducts  = ({productsList, setProductsList}) => {
const [myProducts, setMyProducts] = useState([])
async function fetchMyProducts() {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const user = await getUsersMe(token)
  if(username){
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