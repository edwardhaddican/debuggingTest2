const client = require("./client");
const { createUser } = require("./users");
const { createMerchant } = require("./merchant");
const { createProduct } = require("./Product");

async function dropTables() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS finalOrder;
      DROP TABLE IF EXISTS usersOrders;
       DROP TABLE IF EXISTS Product;
      DROP TABLE IF EXISTS Merchants;
       DROP TABLE IF EXISTS users;
       DROP TYPE IF EXISTS coffeeRoast;
       DROP TYPE IF EXISTS coffeeGrind;
       DROP TYPE IF EXISTS order_status;
      `);
    console.log("Dropping All Tables...");
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
       CREATE TYPE coffeeRoast AS ENUM('Decaf','Mild', 'Medium', 'Dark');
       CREATE TYPE coffeeGrind AS ENUM('Whole Beans', 'Ground', 'Instant');
       CREATE TYPE order_status AS ENUM('pending', 'settled');

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );
        CREATE TABLE Merchants (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          brand varchar(255) NOT NULL,
          "Admin" BOOLEAN DEFAULT true
          );
          CREATE TABLE Product (
            id SERIAL PRIMARY KEY,
            "creatorId" INTEGER REFERENCES Merchants(id),
            countryId INTEGER,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price INTEGER,
            inventory INTEGER NOT NULL,
            weight INTEGER,
            roast coffeeRoast NOT NULL,
            grind coffeeGrind      
          );
          CREATE TABLE usersOrders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "productId" INTEGER REFERENCES Product(id),
            price INTEGER,
            weight INTEGER,
            quantity INTEGER
          );
          CREATE TABLE finalOrder (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "orderId" INTEGER REFERENCES usersOrders(id),
            quantity INTEGER
            );
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialMerchants() {
  console.log("starting to create merchants...");

  const merchantsToCreate = [
    {
      username: "sammy12",
      password: "sammy1234",
      brand: "Sammy's Coffee",
      Admin: true,
    },
    {
      username: "johnny12",
      password: "johnny1234",
      brand: "Johnny's Coffee",
      Admin: true,
    },
    {
      username: "benny12",
      password: "benny1234",
      brand: "Benny's Coffee",
      Admin: true,
    },
    {
      username: "randy12",
      password: "randy1234",
      brand: "Randy's Coffee",
      Admin: true,
    },
  ];
  const merchants = await Promise.all(
    merchantsToCreate.map((merchant) => createMerchant(merchant))
  );
  console.log("Merchants created", merchants);
  console.log("Finished creating merchants.");
}

async function createInitialProducts() {
  console.log("Starting to create PRODUCTS LINE 112");

  const productsToCreate = [
    {
      creatorId: 1,
      countryId: 1,
      name: "Coffee#1",
      description: "coffee stuff description 1",
      price: 20,
      inventory: 78,
      weight: 5,
      roast: "Medium",
      grind: "Ground",
    },
    {
      creatorId: 1,
      countryId: 2,
      name: "Coffee#2",
      description: "coffee stuff description 2",
      price: 55,
      inventory: 99,
      weight: 2,
      roast: "Dark",
      grind: "Ground",
    },
    {
      creatorId: 2,
      countryId: 2,
      name: "Coffee#3",
      description: "coffee stuff description 3",
      price: 15,
      inventory: 50,
      weight: 1,
      roast: "Mild",
      grind: "Whole Beans",
    },
    {
      creatorId: 3,
      countryId: 1,
      name: "Coffee#4",
      description: "coffee stuff description 4",
      price: 10,
      inventory: 2,
      weight: 10,
      roast: "Decaf",
      grind: "Instant",
    },
  ];
  const products = await Promise.all(
    productsToCreate.map((product) => createProduct(product))
  );

  console.log("PRODUCT created:");
  console.log(products);

  console.log("Finished creating PRODUCTS");
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMerchants();
    await createInitialProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
