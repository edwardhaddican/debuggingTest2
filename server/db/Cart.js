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
    WHERE id =${userId};
    `);
    if (!cart && cart.isActive === false) {
      console.log("getcartbyId CREATING CART", cart)
      return await createCart(cart.userId);
    }
    return cart;
  } catch (error) {
    throw error;
  }}

async function updateCart({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE Product
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getProductById(id);
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

module.exports = {
    createCart,
    updateCart,
  getUserByUsername,
  getCartById,
  getCart,
  cartCheckout
};