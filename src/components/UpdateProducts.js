import { useState } from "react";
import { updateProduct } from "../apiAdapter";

const UpdateProducts = ({id})=> {
  const [productName, setProductName ] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [weight, setWeight] = useState(0)
  const [roast, setRoast] = useState('')
  const [grind, setGrind] = useState('')
  const [inventory, setInventory] = useState(0)


  async function handleSubmit (event) {
      event.preventDefault()
      const token = localStorage.getItem('token')
      await updateProduct(token, id, productName, productDescription, price, weight, roast, grind, inventory)
        
      }
  

  return (
    <div className='container text-center '>
        <h1 id="">UPDATE PRODUCT</h1>
    <form className='flex flex-col items-center  ' onSubmit={handleSubmit}>
        <label className="flex flex-col ">
            Name: 
            <input  type='text' value={productName} placeholder='update Name' onChange={(event)=> {setProductName(event.target.value)}}/>
        </label>
        <label className="flex flex-col">
            Description: 
            <input type='text' value={productDescription} onChange={(event)=> {setProductDescription(event.target.value)}}/>
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
