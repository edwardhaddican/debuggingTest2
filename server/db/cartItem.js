const client = require("./client");
const {createCart} = require("./Cart")

async function getcartItem(userId){
  try{
  const {
    rows: [cart],
  } = await client.query(
    `
    SELECT * FROM Cart
    WHERE userId =$1
  `,
    [userId]
  );
  return cart;
} catch (error) {
  throw error;
}}

//
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

// async function getcartItemByCartId({ id }) {
//   try {
//     const { rows } = await client.query(`
//     SELECT *
//     FROM cartItem
//     WHERE "cartId"=${id}
//     `);

//     return rows;
//   } catch (error) {
//     console.error;
//   }
// }

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




async function updatecartItem({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE cartItem
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getcartItemById(id);
  } catch (error) {
    throw error;
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

// async function canEditcartItem(cartItemId, userId) {
//   const {
//     rows: [cartItem],
//   } = await client.query(
//     `
//   SELECT * FROM cartItem
//   JOIN Cart ON cartItem."cartId" = Cart.id
//   AND cartItem.id = $1
//   `,
//     [cartItemId]
//   );

//   if (cartItem.cartId === userId) {
//     return cartItem;
//   } else {
//     return false;
//   }
// }
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
  updatecartItem,
  editItemQuantity,
  getcartItemById,
  getcartItem,
  getcartItemByCartItemId

};
