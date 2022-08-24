const client = require("./client");
const {createCart} = require("./Cart")

async function addProductToCart({
  productId,
  cartId,
  quantity,
  price,
}) {
  try {
    const {
      rows: [Order],
    } = await client.query(
      `
      INSERT INTO cartItem("productId", "cartId", quantity, price) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;
    `,
      [productId,
        cartId,
        quantity,
        price,]
    );

    return Order;
  } catch (error) {
    throw error;
  }
}


async function getcartItemById(Id) {
  try {
    const {
      rows: cart,
    } = await client.query(`
    SELECT *
    FROM cartItem
    WHERE "cartId" =${Id};
    `);
    if (!cart) {
      return null;
    }
    return cart;
  } catch (error) {
    throw error;
  }
}
async function getcartItemByCartItemId(cartItemId) {
  try {
    const { rows: carts } = await client.query(
      `
    SELECT *
    FROM cartItem
    WHERE id = ${cartItemId};
  `,
    );
    return carts;
  } catch (error) {
    console.error("Trouble getting Cart Items", error);
  }
}



async function destroycartItem(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    DELETE FROM cartItem
    WHERE id =$1
    RETURNING *;
    `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function editItemQuantity ({cartItemId, quantity}) {
  console.log(cartItemId, quantity,"INITIATING editItemQuantity")
  const {
    rows: [cartItem],
  } = await client.query(
    `
 UPDATE cartItem
 SET quantity =${quantity}
 WHERE id =${cartItemId}
 RETURNING *;
  `,
    []
  );
console.log(cartItem, "Hello show me cart Item in db")
  if (cartItem.cartId) {
    return cartItem;
  } else {
    return false;
  }

}

module.exports = {

  addProductToCart,
  destroycartItem,
  editItemQuantity,
  getcartItemById,
  getcartItemByCartItemId

};
