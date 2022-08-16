const client = require("./client");
const { getMerchantByUsername } = require("./merchant");

async function createProduct({
  creatorId,
  countryId,
  name,
  description,
  price,
  inventory,
  weight,
  roast,
  grind,
}) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
      INSERT INTO Product("creatorId", countryId, name, description, price, inventory, weight, roast, grind) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `,
      [
        creatorId,
        countryId,
        name,
        description,
        price,
        inventory,
        weight,
        roast,
        grind,
      ]
    );
    creatorId,
      countryId,
      name,
      description,
      price,
      inventory,
      weight,
      roast,
      grind;
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

    const products = await Promise.all(
      productId.map((product) => getProductById(product.id))
    );

    return products;
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

async function getProductsByBrand({ username }) {
  try {
    const seller = await getMerchantByUsername(username);
    console.log(seller, "GETTING  USERNAME ")
    const { rows: [Products]} = await client.query(
      `
    SELECT Product.*
    FROM Product
    JOIN merchants ON Product."creatorId" = merchants.id
    WHERE "creatorId" =$1;
    `,
      [seller.id]
    );
    if (!Products) {
      return null;
    };
    // const allproducts = attachProductsUserOrder(Products)
    console.log(Products,"3 BRAND")
    return Products;
  } catch (error) {
    throw error;
  }
}

async function destroyProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE FROM Product
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );
    console.log(product, "DELETING PRODUCT");
    return product;
  } catch (error) {
    throw error;
  }
}
async function attachProductsUserOrder(usersOrders) {
  console.log(usersOrders,"HELLO HELP ME PLEASE LINE !49 ")
  const ordersToReturn = [...usersOrders];
  const binds = usersOrders.map((_, index) => `$${index + 1}`).join(", ");
  const orderIds = usersOrders.map((userOrder) => userOrder.id);
  if (!orderIds?.length) return [];

  try {
    const { rows: products } = await client.query(
      `
      SELECT Product.*, cartOrder.quantity, cartOrder.price, cartOrder.id AS "cartOrderId", cartOrder."orderId"
      FROM Product
      JOIN cartOrder ON cartOrder."productId" = Product.id
      WHERE cartOrder."orderId" IN (${binds});
    `,
      orderIds
    );

    for (const order of ordersToReturn) {
      const productsToAdd = products.filter(
        (product) => product.orderId === order.id
      );
      order.products = productsToAdd;
    }
    return ordersToReturn;
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

async function getProductsByMerchant( username ) {
  try {
    const { rows: products } = await client.query(
      `
    SELECT Product.*, Merchants.username AS "creatorName"
    FROM Product
    JOIN Merchants ON Product."creatorId" = Merchants.id
    WHERE username = $1;
  `,
      [username]
    );
    return products;
  } catch (error) {
    console.error("Trouble getting products", error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByName,
  updateProduct,
  destroyProduct,
  getProductsByBrand,
  getProductById,
  getProductsByMerchant
};
