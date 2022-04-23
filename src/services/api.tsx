import axios from "axios";

const BASE_URL = "http://localhost:5000";

function authData(token) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

interface AuthType {
  email: string;
  password: string;
  passwordCheck?: string;
}

async function signUp(signUpData: AuthType) {
  await axios.post(`${BASE_URL}/sign-up`, signUpData);
}

async function signIn(signInData: AuthType) {
  const token = await axios.post(`${BASE_URL}/sign-in`, signInData);
  return token;
}
const api = { signUp, signIn };
export default api;
