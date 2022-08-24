const express = require('express');
const  router = express.Router();
const { requireUser } = require('./utils')
const { 
    addProductToCart,
    destroycartItem,
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

router.patch('/:cartItemId', requireUser, async (req, res, next) => {
    const { cartItemId } = req.params;
    console.log(cartItemId, "first check")
    const { quantity} = req.body;
    console.log( quantity, "second check")
    const { username } = req.user
    console.log(username, req.user.id, req.user, "Show me the database money")
    const updatedcartItem = await getcartItemByCartItemId(cartItemId)
    console.log(updatedcartItem, "show me what updatedCartITem")
    try {
        if(!updatedcartItem) {
            res.status(403)
            next ({
                name: "User is not found",
                message: `User ${username} is not allowed to do update this cart`
            })
        } else {
            const upToDatecartItem = await editItemQuantity({ cartItemId, quantity});
            console.log(upToDatecartItem, "Intiating SEND ITEM EDIT")
            res.send(upToDatecartItem)
        }
    } catch (error) {
        next (error)
    }
})


router.delete('/:cartItemId', requireUser, async (req,res,next)=>{
    const { username}= req.user
    const {cartItemId} = req.params
    try{
      const cartItem = await getcartItemByCartItemId(cartItemId)
         if (cartItem ) {
           await destroycartItem(cartItemId)

            res.send(cartItem)
         } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.user.username} is not allowed to delete this cart item.`,
            });
          }
    } catch ({name, message}) {
        next ({name, message})
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