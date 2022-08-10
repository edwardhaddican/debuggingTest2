const client = require("./client");
const { createUser } = require("./users");

async function dropTables() {
    try {
      await client.query(`
     
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS Merchants;
      DROP TABLE IF EXISTS Product;
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
      CREATE TYPE coffeeRoast AS ENUM('decaf','mild', 'medium', 'dark');
      CREATE TYPE coffeeGrind AS ENUM('Whole Beans', 'Ground', 'Instant');
      CREATE TYPE order_status AS ENUM('pending', 'settled');

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );
        CREATE TABLE Merchants (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          "Admin" BOOLEAN DEFAULT true
          );
          CREATE TABLE Product (
            id SERIAL PRIMARY KEY,
            "creatorId" INTEGER REFERENCES Merchants(id),
            "countryId" INTEGER,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            price INTEGER ,
            inventory INTEGER NOT NULL,
            weight INTEGER,
            roast coffeeRoast NOT NULL,
            grind VARCHAR(255)
          );
         
          CREATE TABLE order_cart (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
           "productId" INTEGER REFERENCES  Product(id),
            quantity INTEGER NOT NULL,
            inventorychange INTEGER REFERENCES Product(inventory)
            price INTEGER REFERENCES Product(price),
            UNIQUE(userId, productId)
          ); 
          CREATE TABLE Review (
            id SERIAL PRIMARY KEY, 
            name INTEGER REFERENCES users(id),
            "orderId" INTEGER REFERENCES order_cart.(id),
            status order_status NOT NULL,
            created_at DATE DEFAULT now()
          );
          CREATE TABLE Address (
            id SERIAL PRIMARY KEY,
            street_num INTEGER NOT NULL,
            street_name VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(2),
            zipcode INTERGER NOT NULL
            country INTEGER REFERENCES Country(id)
          );
          CREATE TABLE Country (
            id SERIAL PRIMARY KEY,
            countryName VARCHAR(255) NOT NULL,

        `)
      }
      catch (error) {
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
      
  