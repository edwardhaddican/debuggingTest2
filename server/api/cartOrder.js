const express = require('express');
const  cartOrderRouter = express.Router();
const { requireUser } = require('./utils')
const { 
    addProductToCart,
    destroyCartOrder,
    updateCartOrder,
    getCartOrderrById,
    canEditCartOrder } = require('../db')
//adding product to cart
cartOrderRouter.post('/:cartOrderId/:productId', async (req,res)=>{
        try{
            if(!req.user){
                res.send({
                    name: "no token",
                    message: "No Token present"
                })
                return;
        }
        const cartItem = await addProductToCart(req.body)
        res.send({cartItem})
        
    }catch(error){
        res.send({
            error: error.message
        })
    }
}
    )

cartOrderRouter.patch('/:cartOrderId', requireUser, async (req, res, next) => {
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


cartOrderRouter.delete('/:cartOrderId', requireUser, async (req,res,next)=>{
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


cartOrderRouter.get('/', requireUser, async (req, res, next) => {
    if(!req.user){
        res.send({
            name: "no token",
            message: "No Token present"
        })
        return;

    } 
    const cart = await getCartOrderrById(req.user.id)   
    res.send({cart})
})

module.exports = cartOrderRouter;