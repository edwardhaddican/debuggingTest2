const express = require("express");
const router = express.Router()
const { getAllProducts, createProduct, getProductById, destroyProduct } = require("../db/Product");
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

  router.delete('/:productId', requireUser, async (req,res,next)=> {
      const {productId} = req.params
      try {
          const product = await getProductById(productId)
          if (product && product.creatorId === req.user.id) {
              await destroyProduct(productId)
              res.send(product)
          } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.user.username} is not allowed to delete this post.`,
            });
          }
      } catch ({name,message}) {
          next({name, message})
      }
  })

  module.exports = router