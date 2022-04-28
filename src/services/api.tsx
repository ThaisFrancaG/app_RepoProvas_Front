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

async function logOut(token: string) {
  console.log(token);
  const config = authData(token);
  await axios.post(`${BASE_URL}/log-out`, token, config);
}

async function getFilterItems(token: string, filter: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${filter}`, config);
  return list.data;
}

async function getOuterListDisciplines(token: string, termId: number) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${termId}/disciplines`, config);
  return list.data;
}

async function getInnerListDisciplines(token: string, disciplineId: number) {
  console.log(disciplineId);
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${disciplineId}/tests`, config);
  console.log(list.data);
  return list.data;
}
const api = {
  signUp,
  signIn,
  logOut,
  getFilterItems,
  getOuterListDisciplines,
  getInnerListDisciplines,
};
export default api;
