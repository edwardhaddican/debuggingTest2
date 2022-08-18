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

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
    SELECT id, "userId"
    FROM Cart
    WHERE id =${id};
    `);
    if (!cart) {
      return null;
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

// async function getAllRoutinesByUser({ username }) {
//   try {
//     const user = await getUserByUsername(username);
//     const { rows: cart } = await client.query(
//       `
//     SELECT Cart.*, users.username AS "userId"
//     FROM Product
//     JOIN users ON Cart."userId" = users.id 
//     WHERE "userId" = $1;
//     `,
//       [user.id]
//     );
//     const allProducts = attachActivitiesToRoutines(cart);
//     return allProducts;
//   } catch (error) {
//     throw error;
//   }
// }




// async function destroyRoutine(id) {
//   try {
//     await client.query(
//       `
//     DELETE FROM routine_activities
//     WHERE "routineId" =$1;
//     `,
//       [id]
//     );
//     const {
//       rows: [routine],
//     } = await client.query(
//       `
//     DELETE FROM routines
//     WHERE id = $1
//     RETURNING *;
//     `,
//       [id]
//     );
//     return routine;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
    createCart,
    updateCart,
  getUserByUsername,
  getCartById,
  getCart,
};