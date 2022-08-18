const express = require('express');
const { getCart, getCartById } = require('../db/Cart');
const router = express.Router()

router.get("/", async (req, res, next) => {
  const {id} = req.body
    const cart = await getCartById(id)
  
    res.send(cart);
  });

  module.exports = router