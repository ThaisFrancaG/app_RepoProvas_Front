import axios from "axios";

const BASE_URL = "http://localhost:5001";

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

async function getSearchableItems(token: string, filter: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/search/${filter}`, config);
  return list.data;
}

async function getFilterItems(token: string, filter: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${filter}`, config);
  return list.data;
}
async function getCategories(token: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/categories`, config);
  console.log(list);
  return list.data;
}
async function getOuterListDisciplines(token: string, termId: number) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${termId}/disciplines`, config);
  const categories = list.data.categoriesList;
  const disciplines = list.data.disciplinesList.disciplinesList;
  console.log(categories);
  console.log(disciplines);
  return { categories, disciplines };
}

async function getInnerListDisciplines(
  token: string,
  disciplineId: number,
  categorieId: number
) {
  console.log(disciplineId);
  console.log(categorieId);
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/tests/discipline/${disciplineId}/${categorieId}`,
    config
  );
  console.log(list.data);

  return list.data;
}

async function getInnerListTeachers(
  token: string,
  teacherId: number,
  categorieId: number
) {
  console.log(teacherId);
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/tests/discipline/${teacherId}/${categorieId}`,
    config
  );
  console.log(list.data);

  return list.data;
}
const api = {
  signUp,
  signIn,
  logOut,
  getFilterItems,
  getCategories,
  getOuterListDisciplines,
  getInnerListDisciplines,
  getInnerListTeachers,
  getSearchableItems,
};
export default api;
