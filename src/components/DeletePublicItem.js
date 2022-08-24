import React, { useEffect } from 'react'



const DeletePublicItem = ({guestCart, setGuestCart, cartItemId}) => {


    async function handleDelete (event) {
        event.preventDefault()
        console.log(cartItemId, 'the id')
        const newCart = JSON.parse(localStorage.getItem('cart'))
        const index = newCart.findIndex(object => {
            return object.id === cartItemId;
          });
        console.log(index, 'newwwww')
        newCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(newCart))
        console.log(newCart, 'remove')
        setGuestCart(newCart)
              }

              useEffect(()=> {

              }, [guestCart])
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeletePublicItem