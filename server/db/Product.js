const client = require("./client");

async function createProduct({ name, description, price, inventory, weight, roast, grind, countryId, creatorId }) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
      INSERT INTO Product(name, description) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `,
      [name, description, price, inventory, weight, roast, grind, countryId, creatorId]
    );

    return Products;
  } catch (error) {
    throw error;
  }
}

async function getAllProduct() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM Product;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [Products],
    } = await client.query(`
    SELECT id, name, description
    FROM Products
    WHERE id =${id};
    `);
    if (!Products) {
      return null;
    }
    return Products;
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
    FROM Products
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

async function addingProduct2Cart(orderCart) {
  const ProductsToReturn = [...Cart];
  const binds = orderCart.map((_, index) => `$${index + 1}`).join(", ");
  const productIds = orderCart.map((Product) => Product.id);
  if (!productIds?.length) return [];

  try {
    const { rows: products } = await client.query(
      `
      SELECT products.*, order_cart.duration, order_cart.count, order_cart.id AS "orderCartId", order_cart."productId"
      FROM Products 
      JOIN order_cart ON order_cart."activityId" = activities.id
      WHERE order_cart."routineId" IN (${binds});
    `,
      routineIds
    );

    for (const Product of ProductsToReturn) {
      const productsToAdd = activities.filter(
        (activity) => activity.productId === Product.id
      );
      Product.activities = productsToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE activities
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
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
