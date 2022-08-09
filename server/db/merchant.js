const client = require("./client");
const bcrypt = require("bcrypt");

async function createMerchant({ username, password }) {
  const SALT_COUNT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
    `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getMerchant({ username, password }) {
  const seller = await getMerchantByUsername(username);
  const hashedPassword = seller.password;
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    return false;
  } else {
    delete seller.password;
  }
  return seller;
}

async function getMerchantById(sellerId) {
  try {
    const {
      rows: [seller],
    } = await client.query(`
    SELECT id, username 
    FROM Merchants
    WHERE id =${sellerId};
    `);
    if (!seller) {
      return null;
    }

    return seller;
  } catch (error) {
    throw error;
  }
}

async function getMerchantByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM Merchants
    WHERE username =$1;

    `,
      [userName]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMerchant,
  getMerchant,
  getMerchantById,
  getMerchantByUsername,
};
