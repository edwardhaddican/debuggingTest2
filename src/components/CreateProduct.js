import React, {useState} from 'react'
import { createNewProduct } from '../apiAdapter'


const CreateProduct = ({productsList, setProductsList})=> {
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
        const freshProduct = await createNewProduct(token, name,description, price, weight, roast, grind, inventory)
        if (freshProduct.error) {
            setError(freshProduct)
        } else {
            setError(null)
            setProductsList([...productsList, freshProduct])
        }
    }

    return (
      <div>
          <h1 id="addRoutineTitle">Add A Product</h1>
      {error && error.message ? (
        <h3>{error.message}</h3>
      ) : null}
      <form onSubmit={handleSubmit}>
          <label>
              Name: 
              <input type='text' value={name} placeholder='Add Name' onChange={(event)=> {setName(event.target.value)}}/>
          </label>
          <label>
              Description: 
              <input type='text' value={description} onChange={(event)=> {setDescription(event.target.value)}}/>
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
          <button type='submit'>CREATE</button>
      </form>
      </div>
    )
}

export default CreateProduct