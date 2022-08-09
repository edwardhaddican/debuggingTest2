const client = require("./client");
const { createUser } = require("./users");

async function dropTables() {
    try {
      await client.query(`
     
      DROP TABLE IF EXISTS users;
      `);
      console.log("Dropping All Tables...");
    } catch (error) {
      throw error;
    }
  }

  async function createTables() {
    try {
      console.log("Starting to build tables...");
      await client.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );
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
      
  