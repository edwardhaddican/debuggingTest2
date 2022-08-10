const client = require("./client");
const { createUser } = require("./users");

async function dropTables() {
  try {
    await client.query(`
     
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS Product;
      DROP TABLE IF EXISTS Merchants;
      
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
      CREATE TYPE coffeeRoast AS ENUM('decaf','light', 'medium', 'dark');
      CREATE TYPE coffeeGrind AS ENUM('Whole Beans', 'Ground', 'Instant');
      CREATE TYPE order_status AS ENUM('pending', 'settled');
      CREATE TYPE product_weights AS ENUM('0.5 lbs',' 1 lb', '1 Kilo', '5 Kilos');

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
            "countryId" INTEGER,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            roast coffeeRoast NOT NULL,
            grind coffeeGrind NOT NULL,
            price INTEGER,
            inventory INTEGER NOT NULL,
            weight product_weights NOT NULL
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

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
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
