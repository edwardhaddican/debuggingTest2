const client = require("./client");
const { createUser, getUserByUsername } = require("./users");
const { createMerchant, getMerchantByUsername } = require("./merchant");
const { createProduct, getAllProducts, getProductsByBrand } = require("./Product");
const { createUsersOrders, getUsersOrders } = require("./userOrders");
const { addProductToCart } = require("./cartOrder");

async function dropTables() {
  try {
    await client.query(`
       DROP TABLE IF EXISTS cartOrder;
      DROP TABLE IF EXISTS usersOrders;
       DROP TABLE IF EXISTS Product;
       DROP TABLE IF EXISTS Merchants;
       DROP TABLE IF EXISTS users;
       DROP TYPE IF EXISTS coffeeRoast;
       DROP TYPE IF EXISTS coffeeGrind;
       DROP TYPE IF EXISTS order_status;
       DROP TYPE IF EXISTS coffeeCountry;
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
       CREATE TYPE coffeeRoast AS ENUM('Light','Mild', 'Medium', 'Dark');
       CREATE TYPE coffeeGrind AS ENUM('Whole Beans', 'Ground', 'Instant');
       CREATE TYPE order_status AS ENUM('pending', 'settled');
       CREATE TYPE coffeeCountry AS ENUM('Brazil','Vietnam','Colombia','Indonesia','Ethiopia','Honduras','India','Uganda');

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
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price INTEGER,
            inventory INTEGER NOT NULL,
            weight INTEGER,
            roast coffeeRoast NOT NULL,
            grind coffeeGrind,
            country coffeeCountry      
          );
          CREATE TABLE usersOrders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id)
          
          );
          CREATE TABLE cartOrder (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES Product(id),
            "orderId" INTEGER REFERENCES usersOrders(id),
            quantity INTEGER,
            price INTEGER,
            UNIQUE("productId","orderId")
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
      name: "Coffee#1",
      description: "coffee stuff description 1",
      price: 20,
      inventory: 78,
      weight: 5,
      roast: "Medium",
      grind: "Ground",
      country: "Brazil",
    },
    {
      creatorId: 1,
      
      name: "Coffee#2",
      description: "coffee stuff description 2",
      price: 55,
      inventory: 99,
      weight: 2,
      roast: "Dark",
      grind: "Ground",
      country: "Vietnam",
    },
    {
      creatorId: 2,
      
      name: "Coffee#3",
      description: "coffee stuff description 3",
      price: 15,
      inventory: 50,
      weight: 1,
      roast: "Mild",
      grind: "Whole Beans",
      country: "Colombia",
    },
    {
      creatorId: 3,
     
      name: "Coffee#4",
      description: "coffee stuff description 4",
      price: 10,
      inventory: 2,
      weight: 10,
      roast: "Light",
      grind: "Instant",
       country: "Ethiopia",
    },
    {
      creatorId: 3,
      
      name: "Coffee#5",
      description: "coffee stuff description 5",
      price: 15,
      inventory: 15,
      weight: 30,
      roast: "Medium",
      grind: "Whole Beans",
      country: "Vietnam",
    },
    
  ];
  const products = await Promise.all(
    productsToCreate.map((product) => createProduct(product))
  );

  console.log("PRODUCT created:");
  console.log(products);

  console.log("Finished creating PRODUCTS");
}


async function createInitialuserOrder() {
  console.log("Starting to create USERSORDERS");

  const userOrderstoCreate = [
    {
      userId: 1,
      
    },
    {
      userId: 1,
      
    },
    {
      userId: 1,
     
    },
  
  ];
    const userOrder = await Promise.all(
      userOrderstoCreate.map((product) => createUsersOrders(product))
    );
  
    console.log("PRODUCT created:");
    console.log(userOrder);
  
    console.log("Finished creating PRODUCTS");
  }

  async function createInitialCartOrder() {
    const selleruser = await getMerchantByUsername(`benny12`);
    console.log("Starting to create CART ORDER");
    const [order1, order2, order3] = await getUsersOrders();
  console.log(order1,"Finsihed getting UsersOrders")
  const [product1, product2, product3, product4, product5] = await getAllProducts();
   console.log(await getProductsByBrand(selleruser), "PLEASE HELP ME")
  
  
    const cartOrderstoCreate = [
      {
        productId: product1.id,
        orderId: order1.id,
        quantity: 5,
        price: 20
      },
      {
        productId: product2.id,
        orderId: order2.id,
        quantity: 5,
        price: 3
      },
      {
        productId: product4.id,
        orderId: order1.id,
        quantity: 5,
        price: 100
      },
    ];
    const cartOrder = await Promise.all(
      cartOrderstoCreate.map(addProductToCart)
    );
  
    console.log(cartOrder, " I THINK I CREATED MY CART");
  
    console.log("Finished creating CART");
  }

  
async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMerchants();
    await createInitialProducts();
    await createInitialuserOrder();
    await createInitialCartOrder();
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
