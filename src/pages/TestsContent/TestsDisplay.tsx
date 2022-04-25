import useAuth from "../../hooks/userAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MainHeader from "./PageHeader/Header";
import * as style from "./style";
import api from "../../services/api";
import { DisciplineMap, TeacherMap } from "../../components/TestFilter";

export default function TestsDisplay() {
  const { auth } = useAuth();
  const [filter, setFilter] = useState("disciplines");
  const [filterItems, setItemsFilter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert("Please, make sure that you are loged-in");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("updateTestsList");
    getList();
  }, [filter]);

  async function getList() {
    try {
      const searchItems = await api.getFilterItems(auth, filter);
      setItemsFilter(searchItems);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <MainHeader filter={filter} setFilter={setFilter} />
      <style.MainContainer>
        {filter === "disciplines" ? (
          <DisciplineMap filterItems={filterItems} />
        ) : (
          <TeacherMap filterItems={filterItems} />
        )}
      </style.MainContainer>
    </>
  );
}
