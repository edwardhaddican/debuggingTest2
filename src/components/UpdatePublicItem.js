import React, {useState, useEffect} from 'react'

const UpdatePublicItem = ({setGuestCart, guestCart, cartItemId, isLoggedIn}) => {

    const [cartQuantity,setCartQuantity] = useState(1);
console.log(cartQuantity, 'cart quant')
    async function handleSubmit (event) {
      event.preventDefault()
      const newArr = guestCart.map(obj => {
        if (obj.quantity !== cartQuantity && obj.id === cartItemId) {
            var integer = parseInt(cartQuantity, 10)
          return {...obj, quantity: integer};
        }
        return obj;
    })
    setGuestCart(newArr)
      }
      
      
      
      
      useEffect(() => {
        if (!isLoggedIn) {
            console.log(guestCart, 'guest')
                  localStorage.setItem('cart', JSON.stringify(guestCart))
        }            

      }, [guestCart]);
      
      return(
          <div className="select-none ">
        <form>
                <label>
            QTY:
  
            <input className="  mx-2 text-black rounded-md w-16 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 focus:ring-1 "
              type="number"
              
              value={cartQuantity}
              onChange={(event) => {
                setCartQuantity(event.target.value);
              }}
              onClick={handleSubmit}
            />
           
          </label>
           </form>
        

        </div>
    )
}

export default UpdatePublicItem