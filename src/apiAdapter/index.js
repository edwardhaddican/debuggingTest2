const BASE_URL = "http://localhost:3001/api";

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
      return result
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
          password: password
        
      }),
    });
    const result = await response.json();
    console.log(result)
    const token = result.token;
    return token;
  };

  export const getProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result, "asdfasdfadfadsf")
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const createNewProduct = async (token, nameProduct,description, price, weight, roast, grind, inventory ) => {
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
            inventory
      }),
    });
    const result = await response.json();
  console.log(result)
    return result;
  };