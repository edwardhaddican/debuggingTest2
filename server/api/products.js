const express = require("express");
const router = express.Router()
const { getAllProducts, createProduct, getProductById, destroyProduct, updateProduct, getProductsByName } = require("../db/Product");
const { requireUser, requireMerchant } = require("./utils");



router.get("/", async (req, res, next) => {
    const product = await getAllProducts();
  
    res.send(product);
  });

  router.post("/", requireMerchant, async (req,res,next) => {
      const {creatorId, countryId, name, description, price, inventory, weight, roast, grind,} = req.body
      const productData = {
        creatorId: req.merchant.id, countryId, name, description, price, inventory, weight, roast, grind , inventory
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

  router.delete('/:productId', requireMerchant, async (req,res,next)=> {
      const {productId} = req.params
      try {
          const product = await getProductById(productId)
          if (product && product.creatorId === req.merchant.id) {
              await destroyProduct(productId)
              res.send(product)
          } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.merchant.username} is not allowed to delete this post.`,
            });
          }
      } catch ({name,message}) {
          next({name, message})
      }
  })

  router.patch("/", requireUser, async (req,res,next) => {
    const {productId} = req.params;
    const {countryId, name, description, price, inventory, weight, roast, grind}= req.body;

    const originalProductId = await getProductById(productId);
    const orginalProductName = await getProductsByName(name);
    try {
      if (!originalProductId) {
        next({
          name: "NoProductFound",
          message: `Product ${productId} not found`,
        });
      } else if (orginalProductName) {
          next({
              name: "FailedToUpdate",
              message: `An Product with name ${name} already exists`,
          });
      } else {
        const updatedProduct = await updateProduct({
          id: creatorId,
          countryId, name, description, price, inventory, weight, roast, grind
        });
          
          res.send(updatedProduct);
        } 
      } catch (error) {
          next (error)
      }
  })
  module.exports = router