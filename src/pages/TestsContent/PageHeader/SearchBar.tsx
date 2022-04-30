import React, { useState, useEffect } from "react";

import * as style from "./style";
import api from "../../../services/api";
import useAuth from "../../../hooks/userAuth";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface Props {
  filter: null | string;
  setDisplaySearch?: any;
  setSearchResults?: any;
  toSearch: null | string;
  setToSearch: any;
}
export default function SearchBar(props: Props) {
  const { filter, setDisplaySearch, setSearchResults, toSearch, setToSearch } =
    props;
  const { auth } = useAuth();
  const [filterItems, setItemsFilter] = useState([]);

  useEffect(() => {
    getList();
    setToSearch(null);
  }, [filter]);

  async function getList() {
    try {
      const searchItems = await api.getSearchableItems(auth, filter);
      setItemsFilter(searchItems);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(value: string) {
    setToSearch(value);
  }

  async function handleSearch() {
    const searchId = filterItems.find((item) => item.name === toSearch).id;
    const filteredTestList = await api.getFilteredTestsList(
      filter,
      searchId,
      auth
    );

    setSearchResults(filteredTestList);
    setDisplaySearch(true);
  }

  let itemList = [];
  const itemsOptions = filterItems.map((item) => itemList.push(item.name));

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: filterItems,
    getOptionLabel: (option) => option.name,
  });

  return (
    <style.SearchBarContainer>
      <Autocomplete
        value={toSearch}
        onChange={(event: any, newValue: string | null) => {
          setToSearch(newValue);
        }}
        id="controllable-states-demo"
        options={itemList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Here" />}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <SearchRoundedIcon
        className="eventIcons"
        sx={{ marginLeft: "10px" }}
        onClick={() => handleSearch()}
      />
    </style.SearchBarContainer>
  );
}

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 500,
  height: 50,
  backgroundColor: "#9575cd",
  borderRadius: "5px",
  border: "1px solid #e36dee61",

  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 500,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.background.paper,
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid #e36dee61",
  '& li[data-focus="true"]': {
    backgroundColor: "#9575cd",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));
