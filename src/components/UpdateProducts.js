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
    <div className='flex flex-col absolute  bg-white'>
        <h1 id="addRoutineTitle">UPDATE PRODUCT</h1>
    <form className='flex flex-row' onSubmit={handleSubmit}>
        <label>
            Name: 
            <input type='text' value={productName} placeholder='update Name' onChange={(event)=> {setProductName(event.target.value)}}/>
        </label>
        <label>
            Description: 
            <input type='text' value={productDescription} onChange={(event)=> {setProductDescription(event.target.value)}}/>
        </label>
        <label>
            Price: 
            <input type='text' value={price} onChange={(event)=> {setPrice(event.target.value)}}/>

        </label>
        <label>
            Weight: 
            <input value={weight} type='text' onChange={(event)=> {setWeight(event.target.value)}}/>
        </label>
        <label>
            Roast:
            <input type='text' value={roast} onChange={(event)=> {setRoast(event.target.value)}}/>
        </label>
        <label>
            Grind: 
            <input type='text' value={grind} onChange={(event)=> {setGrind(event.target.value)}}/>
        </label>
        <label>
            Inventory:
            <input value={inventory} type='text' onChange={(event)=> {setInventory(event.target.value)}}/>
        </label>
        <button className="Testbutton" id="updateActivityButton" type="Submit">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
