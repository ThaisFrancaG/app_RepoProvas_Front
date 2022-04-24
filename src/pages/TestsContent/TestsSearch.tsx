import useAuth from "../../hooks/userAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MainHeader from "./PageHeader/Header";

export default function TestsSearch() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert("Please, make sure that you are loged-in");
      navigate("/");
    }
  }, []);

  return (
    <>
      <MainHeader />
    </>
  );
}
