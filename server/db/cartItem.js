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
if(!cart){
  await createCart(userId)
}
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
      rows: [cart],
    } = await client.query(`
    SELECT id, "productId", "cartId", quantity, price
    FROM cartItem
    WHERE "cartId" =${Id};
    `);
    if (!cart) {
      return null;
    }
    // const cartItems = await Promise.all(cart.map((product)=>getcartItemById(product.id)))
    return cart;
  } catch (error) {
    throw error;
//   }
// }
// async function getcartItembyUser( username ) {
//   try {
//     const { rows: products } = await client.query(
//       `
//     SELECT cartItem.*, Cart.userId AS "User_Id"
//     FROM cartItem
//     JOIN Cart ON cartItem."creatorId" = Merchants.id
//     WHERE username = $1;
//   `,
//       [username]
//     );
//     return products;
//   } catch (error) {
//     console.error("Trouble getting products", error);
//   }
// }




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

async function canEditcartItem(cartItemId, userId) {
  const {
    rows: [cartItem],
  } = await client.query(
    `
  SELECT * FROM cartItem
  JOIN Cart ON cartItem."cartId" = Cart.id
  AND cartItem.id = $1
  `,
    [cartItemId]
  );

  if (cartItem.cartId === userId) {
    return cartItem;
  } else {
    return false;
  }
}
async function editItemQuantity ({productId, quantity}) {
  const {
    rows: [cartItem],
  } = await client.query(
    `
 UPDATE cartItem
 SET quantity =$1
 WHERE id =$2
 RETURNING *;
  `,
    [productId, quantity]
  );

  if (cartItem.cartId === userId) {
    return cartItem;
  } else {
    return false;
  }

}

module.exports = {

  addProductToCart,
  destroycartItem,
  updatecartItem,
  canEditcartItem,
  editItemQuantity,
  getcartItemById,
  getcartItem

};
