import React, { useState, useEffect } from "react";
import { getProductsByAdmin, updateProduct } from "../apiAdapter";

const UpdateProducts = ({myProducts, setMyProducts, productId })=> {
  const [name, setName ] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [weight, setWeight] = useState(0)
  const [roast, setRoast] = useState('')
  const [grind, setGrind] = useState('')
  const [inventory, setInventory] = useState(0)
  const [error, setError] = useState(null)

  async function handleSubmit (event) {
      event.preventDefault()
      
      const token = localStorage.getItem('token')
      const username = localStorage.getItem("username")
      const freshProduct = await updateProduct(token, productId, name, description, price, weight, roast, grind, inventory)
      if (freshProduct.error) {
        setError(freshProduct);
      } else {
        setError(null);
        freshProduct;
        const newEditedProduct = await getProductsByAdmin(username);
  
        setMyProducts(newEditedProduct);
      
      }
      }
      useEffect(() => {}, [myProducts]);

  return (

    <div className='flex flex-col absolute  bg-white'>
        <h1 id="addRoutineTitle">UPDATE PRODUCT</h1>
        {error && error.message ? (
            <h3>There Is Already A Product With That Name</h3>
          ) : null}
    <form className='flex flex-row' onSubmit={handleSubmit}>
        <label>
            Name: 
            <input type='text' value={name} placeholder='update Name' onChange={(event)=> {setName(event.target.value)}}/>

        </label>
        <label className="flex flex-col">
            Description: 
            <input type='text' value={description} onChange={(event)=> {setDescription(event.target.value)}}/>
        </label>
        <label className="flex flex-col">
            Price: 
            <input type='text' value={price} onChange={(event)=> {setPrice(event.target.value)}}/>

        </label>
        <label className="flex flex-col">
            Weight: 
            <input value={weight} type='text' onChange={(event)=> {setWeight(event.target.value)}}/>
        </label>
        <label className="flex flex-col">
            Roast:
            <input type='text' value={roast} onChange={(event)=> {setRoast(event.target.value)}}/>
        </label>
        <label className="flex flex-col">
            Grind: 
            <input type='text' value={grind} onChange={(event)=> {setGrind(event.target.value)}}/>
        </label>
        <label className="flex flex-col">
            Inventory:
            <input value={inventory} type='text' onChange={(event)=> {setInventory(event.target.value)}}/>
        </label>
        <button className="container font-medium mt-2  py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500"  >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
