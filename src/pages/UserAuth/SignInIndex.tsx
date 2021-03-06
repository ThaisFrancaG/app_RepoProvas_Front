import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Alert, Collapse, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import authFunctions from "../../components/authForm";
import useAuth from "../../hooks/userAuth";
import * as FormStyles from "./style";
import LogoHeader from "./Logo";

export default function SignIn() {
  const [signInData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleInputChange(value: string, label: string) {
    setSignUpData({ ...signInData, [label]: value });
  }

  async function handleClick() {
    setLoading(true);
    setSubmitError(false);
    try {
      const token = await authFunctions.checkFormInfo(signInData, "signIn");
      login(token);
      navigate("/tests");
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
          value={signInData.email}
          onChange={(e) => handleInputChange(e.target.value, e.target.id)}
        />
        <TextField
          defaultValue="Password"
          id="password"
          label="Password"
          value={signInData.password}
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
        <Link href="/sign-up" underline="hover">
          {"N??o tem conta? Cadastre-se!"}
        </Link>
      </FormStyles.FormContainer>
    </FormStyles.MainContainer>
  );
}
