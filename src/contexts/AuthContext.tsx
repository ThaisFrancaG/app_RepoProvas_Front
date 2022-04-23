import { createContext, useState } from "react";
import React from "react";

interface ContextState {
  auth: string | null;
  login: any;
}
const AuthContext = createContext<ContextState>({} as ContextState);

console.log(AuthContext);

export function AuthProvider({ children }) {
  console.log(children);
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persistedAuth);

  function login(authData: string) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
