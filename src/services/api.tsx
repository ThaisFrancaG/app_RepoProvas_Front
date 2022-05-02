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
  const config = authData(token);
  await axios.post(`${BASE_URL}/log-out`, token, config);
}

async function getSearchableItems(token: string, filter: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/filter/${filter}`, config);
  return list.data;
}

async function getFilteredTestsList(
  filter: string,
  filterId: number,
  token: string
) {
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/tests/${filter}/${filterId}`,
    config
  );

  return list.data;
}
async function getCategories(token: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/categories`, config);

  return list.data;
}

async function getTerms(token: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/terms`, config);

  return list.data;
}

async function testCategory(
  token: string,
  teacherId: number,
  categoryId: number,
  path: string
) {
  alert(path);
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/categories/${path}/${teacherId}/${categoryId}/`,
    config
  );

  return list.data;
}

async function getFilterItems(token: string, filter: string) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${filter}`, config);
  return list.data;
}

async function getDisciplineByTerm(token: string, termId: number) {
  const config = authData(token);
  const list = await axios.get(`${BASE_URL}/${termId}/disciplines`, config);

  const disciplines = list.data.disciplinesList.disciplinesList;

  return disciplines;
}

async function getInnerListDisciplines(
  token: string,
  disciplineId: number,
  categorieId: number
) {
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/tests/discipline/${disciplineId}/${categorieId}`,
    config
  );

  return list.data;
}

async function getInnerListTeachers(
  token: string,
  teacherId: number,
  categorieId: number
) {
  const config = authData(token);
  const list = await axios.get(
    `${BASE_URL}/tests/discipline/${teacherId}/${categorieId}`,
    config
  );

  return list.data;
}

async function testView(token: string, testId: number) {
  const config = authData(token);
  await axios.patch(`${BASE_URL}/tests/views/${testId}`, {}, config);
}
const api = {
  signUp,
  signIn,
  logOut,
  getFilterItems,
  getCategories,
  getTerms,
  getDisciplineByTerm,
  getInnerListDisciplines,
  getInnerListTeachers,
  getSearchableItems,
  getFilteredTestsList,
  testView,
  testCategory,
};
export default api;
