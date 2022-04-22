interface FormData {
  email: string;
  password: string;
  passwordCheck?: string;
}
function checkFormInfo(data: FormData, origin: string) {
  console.log(data);
  console.log(origin);
  //eu posso mapear toda a data recebida, independente do tamanho, para conferir se ela segue as regras

  //primeiro conferir sew todos os dados foram preenchidos.

  let checkCompletion = Object.values(data);
  console.log(checkCompletion);

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
  }
}

const authFunctions = {
  checkFormInfo,
};

export default authFunctions;
