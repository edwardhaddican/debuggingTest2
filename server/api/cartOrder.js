const express = require('express');
const  router = express.Router();
const { requireUser } = require('./utils')
const { 
    destroyCartOrder,
    updateCartOrder,
    getCartOrderrById,
    canEditCartOrder } = require('../db')
    const {addProductToCart} = require('../db/cartOrder')
//adding product to cart
router.post('/:orderId/:productId', async (req,res)=>{
    const {orderId, productId} = req.params
    const {quantity, price} = req.body
        try{
            const cartItem = await addProductToCart({orderId, productId, quantity, price})
            res.send({cartItem})
        
        
    }catch(error){
        res.send({
            error: error.message
        })
    }
}
    )

router.patch('/:cartOrderId', requireUser, async (req, res, next) => {
    const { cartOrderId } = req.params;
    console.log(cartOrderId, "first check")
    const { quantity, price } = req.body;
    console.log( quantity, price, "second check")
    const { username } = req.user
    const updatedCartOrder = await getCartOrderrById(id)
    try {
        if(updatedCartOrder.id !== req.user.id) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to do update this cart`
            })
        } else {
            const upToDateCartOrder = await updateCartOrder({ id: cartOrderId, quantity, price });

            res.send(upToDateCartOrder)
        }
    } catch (error) {
        next (error)
    }
})


router.delete('/:cartOrderId', requireUser, async (req,res,next)=>{
    const { username}= req.user
    try{
        if(!await canEditCartOrder(req.params.cartOrderId, req.user.id)) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to delete this cart`
            })
        } else {
            const deleteProducts = await destroyCartOrder(req.params.cartOrderId)

            res.send(deleteProducts)
        }
    } catch (error) {
        next (error)
    }})


router.get('/', requireUser, async (req, res, next) => {
   
    const cart = await getCartOrderrById(req.user.id)   
    res.send({cart})
})

module.exports = router;