const BASE_URL = "https://fast-atoll-24490.herokuapp.com/api";
// const BASE_URL = "http://localhost:3001/api";
// const BASE_URL = "/api";
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const getProducts = async () => {
  try {

    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "Get Products API CALL");
    return result;
  } catch (error) {
    console.log(error, "Line 55");
    throw error;
  }
};

export const createNewProduct = async (
  token,
  nameProduct,
  description,
  price,
  weight,
  roast,
  grind,
  inventory,
  country
) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameProduct,
      description,
      price,
      weight,
      roast,
      grind,
      inventory,
      country,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const merchantLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/merchants/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const registerMerchant = async (username, password, brand) => {
  const response = await fetch(`${BASE_URL}/merchants/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      brand,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};

export const removeProduct = async (token, productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export async function getProductsByAdmin(username) {
  const response = await fetch(`${BASE_URL}/merchants/${username}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  console.log(result, " this is getproductsbyadmin api ");
  return result;
}

export async function getUsersMe(token) {
  const response = await fetch(`${BASE_URL}/merchants/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result, "merchant");
  return result;
}
export async function getUsersMe2(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
console.log(result, 'the result')
  return result;
}

export async function updateProduct(
  token,
  productId,
  nameProduct,
  description,
  price,
  weight,
  roast,
  grind,
  inventory,
  country
) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameProduct,
      description,
      price,
      weight,
      roast,
      grind,
      inventory,
      country,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export async function addProductsToCart(productId, cartId, quantity, price) {
  const response = await fetch(`${BASE_URL}/cartOrder/${cartId}/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      productId: productId,
      quantity,
      price,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export const getAllCartsByUserId = async (token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/Cart/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
console.log(result, 'user id result')
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCartItemsbyUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/cartOrder/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductsById = async (productId) => {
  try {
    console.log("Hello");
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "Get Products API CALL");
    return result;
  } catch (error) {
    console.log(error, "Line 55");
    throw error;
  }
};


export const editCartItemsbyId = async (token, cartItemId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/cartOrder/${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    const result = await response.json();
console.log(result, 'jjjjj')
    return result;
  } catch (error) {
    throw error;
  }
};


// ATTEMPTING TO CREATE API CALL TO REMOVE ITEMS FROM CART -MICHAEL


export const removeCartItem = async (cartItemId, token) => {
  const response = await fetch(`${BASE_URL}/cartOrder/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result, 'delete')
  return result;
};




export const userCartCheckout = async (token, cartId) => {
  try {
    const response = await fetch(`${BASE_URL}/Cart/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrderHistorybyUserId = async (token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/Cart/${userId}/orderHistory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
console.log(result, 'user id result')
    return result;
  } catch (error) {
    throw error;
  }
};