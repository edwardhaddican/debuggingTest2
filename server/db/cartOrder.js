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

// async function getFinalOrderById(id) {
//   try {
//     const {
//       rows: [routineactivity],
//     } = await client.query(`
//     SELECT id, "routineId", "activityId", count, duration
//     FROM routine_activities
//     WHERE id =${id};
//     `);
//     if (!routineactivity) {
//       return null;
//     }
//     return routineactivity;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getOrdersbyOrderI({ id }) {
//   try {
//     const { rows } = await client.query(`
//     SELECT *
//     FROM routine_activities
//     WHERE "routineId" =${id};
//     `);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// async function updateRoutineActivity({ id, ...fields }) {
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");

//   try {
//     if (setString.length > 0) {
//       await client.query(
//         `
//         UPDATE routine_activities
//         SET ${setString}
//         WHERE id=${id}
//         RETURNING *;
//       `,
//         Object.values(fields)
//       );
//     }
//     return await getRoutineActivityById(id);
//   } catch (error) {
//     throw error;
//   }
// }

// async function destroyRoutineActivity(id) {
//   try {
//     const {
//       rows: [routine],
//     } = await client.query(
//       `
//     DELETE FROM routine_activities
//     WHERE id =$1
//     RETURNING *
//     `,
//       [id]
//     );
//     return routine;
//   } catch (error) {
//     throw error;
//   }
// }

// async function canEditRoutineActivity(routineActivityId, userId) {
//   const {
//     rows: [routineActivity],
//   } = await client.query(
//     `
//   SELECT * FROM routine_activities
//   JOIN routines ON routine_activities."routineId" = routines.id
//   AND routine_activities.id = $1
//   `,
//     [routineActivityId]
//   );

//   if (routineActivity.creatorId === userId) {
//     return routineActivity;
//   } else {
//     return false;
//   }
// }

module.exports = {

  addProductToCart,
};
