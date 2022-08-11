const { attachProductsUsersOrders } = require("./Product");
const client = require("./client");
const { getUserByUsername } = require("./users");

async function createUsersOrders({userId, productId, price, weight, quantity}) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines("userId", "productId", price, weight, quantity) 
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [userId, productId, price, weight, quantity]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getUsersOrdersById(id) {
  try {
    const {
      rows: [userOrder],
    } = await client.query(`
    SELECT id, "userId", "productId", price, weight, quantity
    FROM usersOrders
    WHERE id =${id};
    `);
    if (!userOrder) {
      return null;
    }
    return routine;
  } catch (error) {
    throw error;
  }}

async function updateUsersOrders({ id, ...fields }) {
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
// async function getAllRoutinesByUser({ username }) {
//   try {
//     const user = await getUserByUsername(username);
//     const { rows: userOrder } = await client.query(
//       `
//     SELECT usersOrders.*, users.username AS "userId"
//     FROM Product
//     JOIN users ON usersOrders."userId" = users.id 
//     WHERE "userId" = $1;
//     `,
//       [user.id]
//     );
//     const allProducts = attachActivitiesToRoutines(userOrder);
//     return allProducts;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getPublicRoutinesByUser({ username }) {
//   try {
//     const user = await getUserByUsername(username);
//     const { rows: routines } = await client.query(
//       `
//     SELECT routines.*, users.username AS "creatorName"
//     FROM routines
//     JOIN users ON routines."creatorId" = users.id 
//     WHERE "creatorId" = $1
//     AND "isPublic" = true;
//     `,
//       [user.id]
//     );
//     const allRoutines = attachActivitiesToRoutines(routines);
//     return allRoutines;
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
    updateUsersOrders,
  getUserByUsername,
  getUsersOrdersById,
};