import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { TextField, Box, Alert, Collapse } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import authFunctions from "../../components/authForm";
import * as FormStyles from "./style";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState(false);

  function handleInputChange(value: string, label: string) {
    setSignUpData({ ...signUpData, [label]: value });
  }

  async function handleClick() {
    setLoading(true);
    setSubmitError(false);
    try {
      authFunctions.checkFormInfo(signUpData, "signUp");
    } catch (error) {
      setAlertMessage(error.message);
      setSubmitError(true);
    }
    setLoading(false);
  }

  return (
    <FormStyles.FormContainer>
      <TextField
        defaultValue="Email"
        id="email"
        label="Email"
        value={signUpData.email}
        onChange={(e) => handleInputChange(e.target.value, e.target.id)}
      />
      <TextField
        defaultValue="Password"
        id="password"
        label="Password"
        value={signUpData.password}
        onChange={(e) => handleInputChange(e.target.value, e.target.id)}
      />
      <TextField
        defaultValue="Confirm Password"
        id="passwordCheck"
        label="Confirm Password"
        value={signUpData.passwordCheck}
        onChange={(e) => handleInputChange(e.target.value, e.target.id)}
      />
      <LoadingButton
        size="small"
        onClick={() => handleClick()}
        loading={loading}
        variant="outlined"
        disabled={loading}
      >
        Submit
      </LoadingButton>
      <Collapse in={submitError}>
        <Alert severity="error">{alertMessage}</Alert>
      </Collapse>
    </FormStyles.FormContainer>
  );
}
