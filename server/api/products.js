const express = require("express");
const router = express.Router()
const { getAllProducts, createProduct } = require("../db/Product");
const { requireUser } = require("./utils");


router.get("/", async (req, res, next) => {
    const product = await getAllProducts();
  
    res.send(product);
  });

  router.post("/", requireUser, async (req,res,next) => {
      const {creatorId, countryId, name, description, price, inventory, weight, roast, grind,} = req.body
      const productData = {
        creatorId: req.user.id, countryId, name, description, price, inventory, weight, roast, grind , inventory
      }
      try {
          const product = await createProduct(productData)
          if (product) {
              res.send(product)
          } else {
              next({
                  name: 'ErroCreating',
                  message: 'Error creating Product'
              })
          }
      } catch ({name, message}) {
          next({name, message})
      }
  })

  module.exports = router