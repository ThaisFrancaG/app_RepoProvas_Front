import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Alert, Collapse, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import authFunctions from "../../components/authForm";
import * as FormStyles from "./style";
import LogoHeader from "./Logo";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState(false);
  const navigate = useNavigate();

  function handleInputChange(value: string, label: string) {
    setSignUpData({ ...signUpData, [label]: value });
  }

  async function handleClick() {
    setLoading(true);
    setSubmitError(false);
    try {
      await authFunctions.checkFormInfo(signUpData, "signUp");
      navigate("/");
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
    <FormStyles.MainContainer>
      <LogoHeader />
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
          <Alert variant="filled" severity="error">
            {alertMessage}
          </Alert>
        </Collapse>
        <Link href="/" underline="hover">
          {"Já possuo cadastro"}
        </Link>
      </FormStyles.FormContainer>
    </FormStyles.MainContainer>
  );
}
