const { attachProductsCart, attachProductscart } = require("./Product");
const client = require("./client");
const { getUserByUsername } = require("./users");


async function createCart({userId}) {
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
    if (!cart) {
      return await createCart(userId);
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
    if (!cart) {
      return await createCart();
    }

    return cart
  } catch (error) {
    throw error;
  }}
  async function cartCheckout ({cartId}) {
    console.log(cartId,"INITIATING editItemQuantity")
    const {
      rows: [cart],
    } = await client.query(
      `
   UPDATE Cart
   SET "isActive" = false
   WHERE id =${cartId}
   RETURNING *;
    `,
      [cartId]
    );
  console.log(cart, "Hello show me cart Item in db")
    if (cart) {
      return cart;
    } else {
      return false;
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