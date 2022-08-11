const BASE_URL = "https://localhost:5432/grace-shopper-warp";

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
      const token = result.data.token;
      console.log(token, "THIS IS YOUR TOKEN");
      return token;
    } catch (error) {
      console.log(error);
    }
  };