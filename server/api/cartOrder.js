const express = require('express');
const  cartOrderRouter = express.Router();
const { requireUser } = require('./utils')
const { 
    addProductToCart,
    destroyCartOrder,
    updateCartOrder,
    getCartOrderrById,
    canEditCartOrder } = require('../db')

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
                message: `User ${username} is not allowed to update In the evening`
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
                message: `User ${username} is not allowed to delete In the afternoon`
            })
        } else {
            const deleteProducts = await destroyCartOrder(req.params.routineActivityId)

            res.send(deleteProducts)
        }
    } catch (error) {
        next (error)
    }})

module.exports = cartOrderRouter;