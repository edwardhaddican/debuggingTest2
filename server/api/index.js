const express = require('express');
const { getUserById } = require('../db/users');
const {getMerchantById} = require('../db/merchant')
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.use(async (req,res,next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    console.log('asdfasdfasdfs')
    if (!auth) {
        next()
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);
            const id = parsedToken && parsedToken.id
            if (id) {
                req.user = await getUserById(id)
                next()
            }
        } catch (error) {
            next(error)
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        })
    }
})


const usersRouter = require('./users');
router.use('/users', usersRouter);

const merchantsRouter = require('./merchants')
router.use('/merchants', merchantsRouter)

const productsRouter = require('./products')
router.use('/products', productsRouter)

const cartItemRouter = require('./cartItem')
router.use('/cartOrder', cartItemRouter)

const CartRouter = require('./Cart')
router.use('/Cart', CartRouter)

module.exports = router