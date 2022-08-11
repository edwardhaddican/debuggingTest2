import React, { useEffect, useState } from "react";

import { getProducts } from "../apiAdapter";

const Products = ({productsList, setProductsList}) => {

    useEffect(() => {
        getProducts().then((results) => {
            setProductsList(results)
        })
    }, [])
    
    const displayProducts = productsList.map((element, index) => {
        return (
            <div className='SingleProduct'  key={`Product ${index}`}>
                <div className="nameAllProducts">Name: {element.name}</div>
                <div className="descriptionAllProducts">Description: {element.description}</div>
            </div>
        )
    })
    
        return (
            <div className="allProducts">
                <div className="ProductsHeader">
                    Products
                </div>
                <div>
                    {displayProducts}
                </div>
            </div>
        )
    }

export default Products;
