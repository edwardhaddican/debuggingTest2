const client = require("./client");
const {createUsersOrders} = require("./Cart")

async function getcartItem(userId){
  try{
  const {
    rows: [cart],
  } = await client.query(
    `
    SELECT * FROM usersOrders
    WHERE userId =$1
  `,
    [userId]
  );
if(!cart){
  await createUsersOrders(userId)
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

async function getcartItemByUserOrder({ id }) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM cartItem
    WHERE "cartId"=${id}
    `);

    return rows;
  } catch (error) {
    console.error;
  }
}

async function getcartItemrById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
    SELECT id, "productId", "cartId", quantity, price
    FROM cartItem
    WHERE id =${id};
    `);
    if (!order) {
      return null;
    }
    return order;
  } catch (error) {
    throw error;
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
    return await getcartItemrById(id);
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
  JOIN userOrders ON cartItem."cartId" = userOrders.id
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
  getcartItemrById,
  canEditcartItem,
  editItemQuantity,

  getcartItem

};
