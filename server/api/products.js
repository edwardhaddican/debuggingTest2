const express = require("express");
const router = express.Router()
const { getAllProducts } = require("../db/Product");


router.get("/", async (req, res, next) => {
    const product = await getAllProducts();
  
    res.send(product);
  });

  module.exports = router