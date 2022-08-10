const client = require("./client");
const { createUser } = require("./users");
const {createMerchant} = require('./merchant')

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
  console.log('Merchants created', merchants);
  console.log("Finished creating merchants.");
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMerchants()
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
