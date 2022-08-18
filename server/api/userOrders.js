const express = require('express');
const { getUsersOrders } = require('../db/userOrders');
const router = express.Router()

router.get("/", async (req, res, next) => {
    const cart = await getUsersOrders()
  
    res.send(cart);
  });

  module.exports = router