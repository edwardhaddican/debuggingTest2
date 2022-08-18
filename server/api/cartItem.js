const express = require('express');
const  router = express.Router();
const { requireUser } = require('./utils')
const { 
    destroycartItem,
    updatecartItem,
    getcartItemrById,
    canEditcartItem } = require('../db')
    const {addProductToCart} = require('../db/cartItem')
//adding product to cart
router.post('/:cartId/:productId', async (req,res)=>{
    const {cartId, productId} = req.params
    const {quantity, price} = req.body
        try{
            const cartItem = await addProductToCart({cartId, productId, quantity, price})
            res.send({cartItem})
        
        
    }catch(error){
        res.send({
            error: error.message
        })
    }
}
    )

router.patch('/:cartItemId', requireUser, async (req, res, next) => {
    const { cartItemId } = req.params;
    console.log(cartItemId, "first check")
    const { quantity, price } = req.body;
    console.log( quantity, price, "second check")
    const { username } = req.user
    const updatedcartItem = await getcartItemrById(id)
    try {
        if(updatedcartItem.id !== req.user.id) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to do update this cart`
            })
        } else {
            const upToDatecartItem = await updatecartItem({ id: cartItemId, quantity, price });

            res.send(upToDatecartItem)
        }
    } catch (error) {
        next (error)
    }
})


router.delete('/:cartItemId', requireUser, async (req,res,next)=>{
    const { username}= req.user
    try{
        if(!await canEditcartItem(req.params.cartItemId, req.user.id)) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to delete this cart`
            })
        } else {
            const deleteProducts = await destroycartItem(req.params.cartItemId)

            res.send(deleteProducts)
        }
    } catch (error) {
        next (error)
    }})


router.get('/', requireUser, async (req, res, next) => {
   
    const cart = await getcartItemrById(req.user.id)   
    res.send({cart})
})

module.exports = router;