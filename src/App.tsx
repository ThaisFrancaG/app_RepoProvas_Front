import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/UserAuth/SignUpIndex";
import SignIn from "./pages/UserAuth/SignInIndex";
import { AuthProvider } from "./contexts/AuthContext";
import TestsDisplay from "./pages/TestsContent/TestsDisplay";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/tests" element={<TestsDisplay />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
