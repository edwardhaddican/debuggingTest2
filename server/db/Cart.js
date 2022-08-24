const { attachProductsCart, attachProductscart } = require("./Product");
const client = require("./client");
const { getUserByUsername } = require("./users");


async function createCart({userId}) {
  console.log("CREATING CART FOR USER", userId)
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
      INSERT INTO Cart("userId") 
      VALUES($1)
      RETURNING *;
    `,
      [userId]
    );
    console.log("CREATED CART",orders)
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getCartById(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
    SELECT *
    FROM Cart
    WHERE "userId" =${userId}
    AND "isActive" = true;
    `);
    return cart;
  } catch (error) {
    throw error;
  }}


  async function cartCheckout (cartId) {
    console.log(cartId,"INITIATING CHECKOUT")
    const {
      rows: [cart],
    } = await client.query(
      `
   UPDATE Cart
   SET "isActive" = false
   WHERE id =${cartId}
   RETURNING *;
    `,
      []
    );
  console.log(cart.userId, "Hello show me cart Item in db")
    if (cart.isActive === false) {
      const getUserId = await getUserIdbyCartId(cartId)
       await createCart(getUserId)
       return cart;
    } else {
      return false;
    }
  
  }

  async function getUserIdbyCartId (cartId){
    console.log("grabbing User ID by cartId", cartId)
    try{
    const {
      rows: [cart]
    } = await client.query(
      `
      SELECT Cart."userId" FROM cartItem
      JOIN Cart ON Cart.id = cartItem."cartId"
      WHERE cartItem."cartId" = ${cartId}
      `
    )
    console.log("grabbed USER ID", cart)
    return cart}
    catch(error){
      throw error
    }
  }

  async function getOrderHistorybyId(userId) {
    try {
      const {
        rows: carts,
      } = await client.query(`
      SELECT*
      FROM Cart
      WHERE "userId" =${userId}
      AND "isActive" = false;
      `);
      console.log("Order History", carts)
      return carts;
    } catch (error) {
      throw error;
    }}

 async function getOrderHistory() {
      try {
        const { rows: cartId } = await client.query(`
          SELECT id
          FROM Product;
        `);
    
        const carts = await Promise.all(
          cartId.map((cart) => getOrderHistorybyId(cart.id))
        );
    
        return carts;
      } catch (error) {
        throw error;
      }
    }

    async function getCart() {
      try {
        const {
          rows: cart,
        } = await client.query(`
        SELECT *
        FROM Cart;
        `);
        // if (!cart) {
        //   return await createCart();
        // }
    
        return cart
      } catch (error) {
        throw error;
      }}
module.exports = {
    createCart,
  getUserByUsername,
  getCartById,
  cartCheckout,
  getOrderHistorybyId,
  getOrderHistory,
  getCart
};