const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const { getMerchantByUsername, createMerchant } = require('../db/merchant');
const { getProductsByMerchant } = require('../db/Product');
const { JWT_SECRET } = process.env;
const {requireUser} = require('./utils')

router.post('/register', async (req,res,next)=> {
    const {username, password, brand, Admin} = req.body
    console.log(username)
    if (!username || !password) {
        next({
            name: 'MissingCredentialError',
            message: 'Please supply both username and password'
        })
    }
    if (password.length < 8) {
        next({
            name: 'PasswordLengthError',
            message: 'Password must be longer than 8 characters'
        })
    }
    try {
        const _merchant = await getMerchantByUsername(username)
        if (_merchant) {
            next({
                name: 'UserExistError',
                message: `Merchant ${_merchant.username} alredy exists.`
            })
        } else {
            const merchant = await createMerchant({
                username,
                password,
                brand,
                Admin
            })
            if (merchant) {
            const token = jwt.sign({
                id: merchant.id,
                username
            }, JWT_SECRET)
            res.send({message: "Thank you for signing up!", token, merchant})
            } else {
                next({
                    name: 'MerchantCreationError',
                    nessage: "Error creating merchant"
                })
            }
        }
        
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req,res,next)=> {
    const {username, password} = req.body.merchant
    if (!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both username and pasword'
        })
    }
    try {
        const merchant = await getMerchantByUsername(username)
        if (merchant) {
            const token = jwt.sign({
                id: merchant.id,
                username
            }, JWT_SECRET)
            res.send({message: 'You are logged in!', token, merchant})
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Incorrect username or password'
            })
        }
    } catch ({name, message}) {
        next({name,message})
    }
})


router.get("/me", requireUser, async (req, res, next) => {
    try {
      res.send(req.merchant);
    } catch (error) {
      next(error);
    }
  });


  router.get("/:username/products", async (req, res, next) => {
    const {username} = req.params
    const {merchant} = req.merchant
    console.log(merchant, "this is merchant")
    try {
        const productUser = await getProductsByMerchant(username)
       if (username === merchant.username && productUser.length) {
          console.log(productUser, "THIS IS PRODUCT USER")
           res.send(productUser)
       } else {
           next({
               name:'ErrorGettingProducts',
               message: 'Product error'
           })
       }
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = router