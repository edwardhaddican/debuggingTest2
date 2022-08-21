const express = require('express');
const  router = express.Router();
const { requireUser } = require('./utils')
const { 
    addProductToCart,
    destroycartItem,
    updatecartItem,
    canEditcartItem,
    getcartItem,
    getcartItemById,
    getcartItemByCartItemId,
    editItemQuantity,
 } = require('../db/cartItem');

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

router.patch('/:cartItemId/edit', requireUser, async (req, res, next) => {
    const { cartItemId } = req.params;
    console.log(cartItemId, "first check")
    const { quantity} = req.body;
    console.log( quantity, "second check")
    const { username } = req.user
    console.log(username, req.user.id, req.user, "Show me the database money")
    const updatedcartItem = await getcartItemByCartItemId(cartItemId)
    console.log(updatedcartItem, "show me what updatedCartITem")
    try {
        if(updatedcartItem.cartId !== req.user.id) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to do update this cart`
            })
        } else {
            const upToDatecartItem = await editItemQuantity({ id: cartItemId, quantity});

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

    router.get('/:userId', async (req,res,next)=> {
        const {userId} = req.params
        const cartOrder = await getcartItemById(userId)
        res.send(cartOrder)
      })

// router.get('/', requireUser, async (req, res, next) => {
   
//     const cart = await getcartItem(req.user.id)   
//     res.send({cart})
// })
module.exports = router;