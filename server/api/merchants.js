const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const { getMerchantByUsername, createMerchant, getMerchant } = require('../db/merchant');
const { getProductsByMerchant} = require('../db/Product');
const { JWT_SECRET } = process.env;
const {requireMerchant} = require('./utils')

router.post('/register', async (req,res,next)=> {
    const {username, password, brand, Admin} = req.body
    console.log(username)
    if (!username || !password) {
        next({
            name: 'MissingCredentialError',
            message: 'Please supply both username and password'
        })
    }
    
    try {
        const _merchant = await getMerchantByUsername(username)
        if (_merchant) {
            next({
                name: 'UserExistError',
                message: `Admin ${_merchant.username} alredy exists.`
            })
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password must be longer than 8 characters'
            })
        }
        
        else {
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
        const merchant = await getMerchant({username, password})
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


router.get("/me", requireMerchant, async (req, res, next) => {
    try {
      res.send(req.merchant);
    } catch (error) {
      next(error);
    }
  });


  router.get("/:username/products", async (req, res, next) => {
    const {username} = req.params
   
  
   
    try {
        const productUser = await getProductsByMerchant(username)
       if (username) {
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