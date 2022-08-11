const client = require("./client");

async function createProduct({ creatorId, countryId, name, description, price, inventory, weight, roast, grind }) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
      INSERT INTO Product("creatorId", countryId, name, description, price, inventory, weight, roast, grind) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `,
      [creatorId, countryId, name, description, price, inventory, weight, roast, grind]
    );
    creatorId, countryId, name, description, price, inventory, weight, roast, grind
    return Products;
  } catch (error) {
    throw error;
  }
}



async function getProductById(productId) {
  try {
    const {
      rows: [Products],
    } = await client.query(`
    SELECT *
    FROM Product
    WHERE id =${productId};
    `);
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}
async function getAllProducts() {
  try {
    const { rows: productId } = await client.query(`
      SELECT id
      FROM Product;
    `);

    const products = await Promise.all(productId.map(
      product => getProductById( product.id )
    ));

    return products
  } catch (error) {
    throw error;
  }
}

async function getProductsByName(name) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE name=$1;
    `,
      [name]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}
// async function attachProductsUserOrder(userOrder) {
//   const productsToReturn = [...userOrder];
//   const binds = userOrder.map((_, index) => `$${index + 1}`).join(", ");
//   const productIds = userOrder.map((product) => product.id);
//   if (!productIds?.length) return [];

//   try {
//     const { rows: products } = await client.query(
//       `
//       SELECT products.*, .duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
//       FROM activities 
//       JOIN routine_activities ON routine_activities."activityId" = activities.id
//       WHERE routine_activities."routineId" IN (${binds});
//     `,
//       routineIds
//     );

//     for (const routine of routinesToReturn) {
//       const activitiesToAdd = activities.filter(
//         (activity) => activity.routineId === routine.id
//       );
//       routine.activities = activitiesToAdd;
//     }
//     return routinesToReturn;
//   } catch (error) {
//     throw error;
//   }
// }


async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE Products
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByName,
  updateProduct,
};
