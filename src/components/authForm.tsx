/* eslint-disable no-throw-literal */
import api from "../services/api";

interface FormData {
  email: string;
  password: string;
  passwordCheck?: string;
}
async function checkFormInfo(data: FormData, origin: string) {
  console.log(data);
  console.log(origin);

  let checkCompletion = Object.values(data);

  for (let i = 0; i < checkCompletion.length; i++) {
    if (checkCompletion[i].length === 0) {
      console.log("chegou no erro");
      throw { type: "incomplete", message: "Please, fill all fields" };
    }
  }

  if (origin === "signUp") {
    if (data.password.length < 6) {
      throw {
        type: "conflite",
        message: "Password must include at least 6 characters",
      };
    }
    if (data.password !== data.passwordCheck) {
      throw {
        type: "conflite",
        message: "Password and check must be the same",
      };
    }
    await signUp(data);
  }
}

async function signUp(data: FormData) {
  await api.signUp(data);
}

const authFunctions = {
  checkFormInfo,
};

export default authFunctions;
