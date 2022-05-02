import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";

import api from "../services/api";
import useAuth from "../hooks/userAuth";
import { Categories, TestsCategories } from "./TestAccordions";

interface Props {
  searchResults:
    | {
        id: number;
        name: string;
        termId?: number;
      }
    | any;
  toSearch: string;
  filter: any | string;
}

function SearchResultsMap(props: Props) {
  const { searchResults, toSearch, filter } = props;
  const [categories, setCategories] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);

  const { auth } = useAuth();
  function handleChange(id) {
    setExpandedFilter(id);
  }

  useEffect(() => {
    getCategories();
  }, [expandedFilter]);

  async function getCategories() {
    const categorieList = await api.getCategories(auth);
    setCategories(categorieList);
  }

  return (
    <>
      {searchResults.length === 0 ? (
        <Typography>There are no Tests from {toSearch} </Typography>
      ) : (
        <TestsCategories testList={searchResults} filter={filter} />
      )}
    </>
  );
}

export { SearchResultsMap };
