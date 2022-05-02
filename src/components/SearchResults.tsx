import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
}

function SearchResultsMap(props: Props) {
  const { searchResults, toSearch } = props;
  const [categories, setCategories] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);

  const { auth } = useAuth();
  function handleChange(id) {
    setExpandedFilter(id);
  }
  console.log(searchResults);
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
        <TestsCategories testList={searchResults} />
      )}
    </>
  );
}

export { SearchResultsMap };
