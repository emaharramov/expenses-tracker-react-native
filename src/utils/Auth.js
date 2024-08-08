import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyAAHCaJFSnOxmcWPNxFGpSGffqBLwIHe68";

async function createUser(email, password) {
  const response = await axios.post(`${BASE_URL}signUp?key=${API_KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return response.data;
}

async function loginUser(email, password) {
  const response = await axios.post(
    `${BASE_URL}signInWithPassword?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return response.data;
}

export { createUser, loginUser };
