const express = require('express');
const { getCart, getCartById, cartCheckout } = require('../db/Cart');
const { requireUser } = require('./utils');
const router = express.Router()

// router.get("/", async (req, res, next) => {
//   const {id} = req.body
//     const cart = await getCartById(id)
  
//     res.send(cart);
//   });
 router.get('/:userId',requireUser, async (req,res,next)=> {
   const {userId} = req.params
   const cartUser = await getCartById(userId)
   res.send(cartUser)
 })

 router.patch("/:cartId", requireUser, async (req, res, next) => {
  const {cartId} = req.params
  console.log(cartId," GOT CART ID FOR CHECKOUT")
      try {
        console.log("INITIALIZING CHECKOUT ")
          const userCartCheckout = await getCartById(cartId)
          if (req.user.id) {
             const purchaseCart= await cartCheckout(cartId)
             console.log(purchaseCart,"Hello show me the purchased cart")
              res.send(purchaseCart)
          } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.user.username} is not allowed to checkout for some reason?`,
            });
          }
      } catch ({name,message}) {
          next({name, message})
      }
  })
  module.exports = router