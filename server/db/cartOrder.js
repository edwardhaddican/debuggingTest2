const client = require("./client");

//
async function addProductToCart({
  productId,
  orderId,
  quantity,
  price,
}) {
  try {
    const {
      rows: [Order],
    } = await client.query(
      `
      INSERT INTO cartOrder("productId", "orderId", quantity, price) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;
    `,
      [productId,
        orderId,
        quantity,
        price,]
    );

    return Order;
  } catch (error) {
    throw error;
  }
}

async function getCartOrderByUserOrder({ id }) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM cartOrder
    WHERE "orderId"=${id}
    `);

    return rows;
  } catch (error) {
    console.error;
  }
}

async function getCartOrderrById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
    SELECT id, "productId", "orderId", quantity, price
    FROM cartOrder
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

async function updateCartOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE cartOrder
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getCartOrderrById(id);
  } catch (error) {
    throw error;
  }
}

async function destroyCartOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    DELETE FROM cartOrder
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

async function canEditCartOrder(cartOrderId, userId) {
  const {
    rows: [cartOrder],
  } = await client.query(
    `
  SELECT * FROM cartOrder
  JOIN userOrders ON cartOrder."orderId" = userOrders.id
  AND cartOrder.id = $1
  `,
    [cartOrderId]
  );

  if (cartOrder.orderId === userId) {
    return cartOrder;
  } else {
    return false;
  }
}
async function editItemQuantity ({productId, quantity}) {
  const {
    rows: [cartOrder],
  } = await client.query(
    `
 UPDATE cartOrder
 SET quantity =$1
 WHERE id =$2
 RETURNING *;
  `,
    [productId, quantity]
  );

  if (cartOrder.orderId === userId) {
    return cartOrder;
  } else {
    return false;
  }

}

module.exports = {

  addProductToCart,
  destroyCartOrder,
  updateCartOrder,
  getCartOrderrById,
  canEditCartOrder,
  editItemQuantity,
  getCartOrderByUserOrder
};
