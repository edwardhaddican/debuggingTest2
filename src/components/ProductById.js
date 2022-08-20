import React, {useState, useEffect} from 'react'
import { getProductsById } from '../apiAdapter'


const ProductById= ({productId}) => {

    const [getProduct, setGetProduct] = useState([])
   async function fetchProductId () {
  
    const getTheProduct = await getProductsById(productId)
    setGetProduct(getTheProduct)
  }

  useEffect(()=> {
      fetchProductId()
  }, [])


    return (
        <div>
            <h1>{getProduct.name}</h1>
            <h1>{getProduct.description}</h1>
        </div>
    )
}

export default ProductById