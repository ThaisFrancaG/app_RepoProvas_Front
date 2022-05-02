import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MinHeader } from "../TestsContent/PageHeader/Header";

export function TestAddForm() {
  //i will have to get all the possible options

  const [terms, setTerms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  //o term é pego no back end
  const [testName, setTestName] = useState("");
  const [testURL, setTestURL] = useState("");

  console.log(testName);

  useEffect(() => {}, []);
  return (
    <>
      <Stack spacing={2} sx={{ width: 500 }}>
        <MinHeader />
        <TextField
          defaultValue="Test Name"
          variant="standard"
          size="small"
          id="testName"
          label="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <TextField
          defaultValue="Test URL"
          variant="standard"
          size="small"
          id="testURL"
          label="PDF URL"
          value={testURL}
          onChange={(e) => setTestURL(e.target.value)}
        />
        {/* <Autocomplete
        id="size-small-standard"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => "oi"}
        defaultValue={top100Films[13]}
        renderInput={(params) => (
          <TextField
          {...params}
          variant="standard"
          label="Size small"
            placeholder="Favorites"
            />
        )}
      /> */}
      </Stack>
    </>
  );
}
