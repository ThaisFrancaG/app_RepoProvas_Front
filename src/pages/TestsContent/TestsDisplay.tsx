import useAuth from "../../hooks/userAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MainHeader } from "./PageHeader/Header";
import * as style from "./style";
import api from "../../services/api";
import { DisciplineMap } from "../../components/TestsDisciplines";
import { TeacherMap } from "../../components/TestsTeachers";
import { SearchResultsMap } from "../../components/SearchResults";
import MainFooter from "../AddNewTest/Footer";

export default function TestsDisplay() {
  const { auth } = useAuth();
  const [filter, setFilter] = useState("disciplines");
  const [filterItems, setItemsFilter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [toSearch, setToSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert("Please, make sure that you are loged-in");
      navigate("/");
    }
  }, []);

  return (
    <>
      <MainHeader
        filter={filter}
        setFilter={setFilter}
        setDisplaySearch={setDisplaySearch}
        setSearchResults={setSearchResults}
        toSearch={toSearch}
        setToSearch={setToSearch}
      />
      <style.MainContainer>
        {displaySearch ? (
          <SearchResultsMap
            searchResults={searchResults}
            toSearch={toSearch}
            filter={filter}
          />
        ) : filter === "disciplines" ? (
          <DisciplineMap filter={filter} />
        ) : (
          <TeacherMap filter={filter} />
        )}
      </style.MainContainer>
      <MainFooter />
    </>
  );
}
