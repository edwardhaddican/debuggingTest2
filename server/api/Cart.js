const express = require('express');
const { getCart, getCartById } = require('../db/Cart');
const router = express.Router()

router.get("/", async (req, res, next) => {
  const {id} = req.body
    const cart = await getCartById(id)
  
    res.send(cart);
  });
 router.get('/:userId', async (req,res,next)=> {
   const {userId} = req.params
   const cartUser = await getCartById(userId)
   res.send(cartUser)
 })
  module.exports = router