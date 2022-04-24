import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/UserAuth/SignUpIndex";
import SignIn from "./pages/UserAuth/SignInIndex";
import { AuthProvider } from "./contexts/AuthContext";
import TestsSearch from "./pages/TestsContent/TestsSearch";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/tests" element={<TestsSearch />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
