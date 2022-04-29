import React, { useState, useEffect } from "react";

import * as style from "./style";
import api from "../../../services/api";
import useAuth from "../../../hooks/userAuth";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";

interface Props {
  filter: null | string;
}
export default function SearchBar(props: Props) {
  const { filter } = props;
  const { auth } = useAuth();
  const [filterItems, setItemsFilter] = useState([]);
  console.log(filter);

  useEffect(() => {
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
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Search by {filter}</Label>
          <Input {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as typeof filterItems).map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.name}</li>
            ))}
          </Listbox>
        ) : null}
      </div>
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
