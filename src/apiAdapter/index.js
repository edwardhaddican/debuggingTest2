const BASE_URL = "http://localhost:3001/";

export const userLogin = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}api/users/login`, {
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
      const token = result.token;
      return token;
    } catch (error) {
      console.log(error);
    }
  };