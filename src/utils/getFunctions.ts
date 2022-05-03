import api from "../services/api";
import useAuth from "../hooks/userAuth";

const { auth } = useAuth();

async function getCategories() {
  const categorieList = await api.getCategories(auth);
  return categorieList;
}
async function getTeachers() {
  const teachersList = await api.getSearchableItems(auth, "teachers");
  return teachersList;
}
async function getDisciplines() {
  const disciplinesList = await api.getSearchableItems(auth, "disciplines");
  return disciplinesList;
}
const utils = { getCategories, getTeachers, getDisciplines };

export default utils;
