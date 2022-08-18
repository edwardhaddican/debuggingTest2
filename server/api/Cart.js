const express = require('express');
const { getCart } = require('../db/Cart');
const router = express.Router()

router.get("/", async (req, res, next) => {
    const cart = await getCart()
  
    res.send(cart);
  });

  module.exports = router