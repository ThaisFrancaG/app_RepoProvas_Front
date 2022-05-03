import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

import { MinHeader } from "../TestsContent/PageHeader/Header";
import useAuth from "../../hooks/userAuth";
import api from "../../services/api";
import { MainContainer } from "../TestsContent/style";
import { useNavigate } from "react-router";
import { TextField, Alert, Collapse, Link } from "@mui/material";
import { checkTestInfo } from "../../components/checkTestInfo";
export function TestAddForm() {
  //i will have to get all the possible options
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [submitSucess, setSubmitSucess] = useState(false);

  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [chosenTeacher, setChosenTeacher] = useState(null);
  const [chosenDiscipline, setChosenDiscipline] = useState(null);
  const [chosenCategory, setChosenCategory] = useState(null);

  const [disciplines, setDisciplines] = useState([]);
  //o term é pego no back end

  const [testName, setTestName] = useState("");
  const [testURL, setTestURL] = useState("");
  const { auth } = useAuth();
  useEffect(() => {
    getDisciplines();
    getTeachers();
    getCategories();
  }, []);

  async function getCategories() {
    const categorieList = await api.getCategories(auth);
    setCategories(categorieList);
  }
  async function getTeachers() {
    const teachersList = await api.getSearchableItems(auth, "teachers");
    setTeachers(teachersList);
  }
  async function getDisciplines() {
    const disciplinesList = await api.getSearchableItems(auth, "disciplines");
    setDisciplines(disciplinesList);
  }

  async function handleClick() {
    setSubmitError(false);
    setSubmitSucess(false);

    setLoading(true);
    if (
      chosenCategory === null ||
      chosenDiscipline === null ||
      chosenTeacher === null
    ) {
      setAlertMessage(
        "Please, select all of the filters before proceeeding. If you don´t find either teacher, category or discipline that applies to your test, please contact us"
      );
      setLoading(false);
      setSubmitError(true);
    }
    const testInfo = {
      name: testName,
      pdfUrl: testURL,
      categoryId: chosenCategory.id,
      teacherId: chosenTeacher.id,
      disciplineId: chosenDiscipline.id,
    };

    try {
      await checkTestInfo(testInfo, auth);
      setSubmitSucess(true);
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data);
      } else {
        setAlertMessage(error.message);
      }
      setSubmitError(true);
    }

    setLoading(false);
  }

  return (
    <>
      <MinHeader />
      <MainContainer>
        <Stack spacing={2} sx={{ width: 500 }}>
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
          <Autocomplete
            value={chosenTeacher}
            onChange={(event: any, newValue: string | null) => {
              setChosenTeacher(newValue);
            }}
            id="teachers"
            size="small"
            options={teachers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Teacher"
                placeholder="ex.Ana,Leandro..."
              />
            )}
          />
          <Autocomplete
            value={chosenDiscipline}
            onChange={(event: any, newValue: string | null) => {
              setChosenDiscipline(newValue);
            }}
            id="disciplines"
            size="small"
            options={disciplines}
            getOptionLabel={(option) => option.name}
            defaultValue="disciplines"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Disciplines"
                placeholder="ex.Math,Calculus I..."
              />
            )}
          />
          <Autocomplete
            value={chosenCategory}
            onChange={(event: any, newValue: string | null) => {
              setChosenCategory(newValue);
            }}
            id="categories"
            size="small"
            defaultValue="categories"
            options={categories}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Categories"
                placeholder="ex.P1,P2..."
              />
            )}
          />
        </Stack>
        <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
        <Collapse in={submitError}>
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Collapse>
        <Collapse in={submitSucess}>
          <Alert variant="filled" severity="success">
            Thank you for sharing this test with us!!
          </Alert>
        </Collapse>
      </MainContainer>
    </>
  );
}
