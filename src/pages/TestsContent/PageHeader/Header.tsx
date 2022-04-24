import styled from "styled-components";
import React, { useState } from "react";
import useAuth from "../../../hooks/userAuth";
import logo from "../../../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function MainHeader() {
  const [open, setOpen] = React.useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  async function logOut() {
    console.log("chegou");
    try {
      await api.logOut(auth);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/");
  }
  return (
    <HeaderConteiner>
      <InfoContainer>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <LogoutIcon sx={{ fontSize: 60 }} onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to logOut?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>No, cancel</Button>
            <Button onClick={() => logOut()} autoFocus>
              Yes, please
            </Button>
          </DialogActions>
        </Dialog>
      </InfoContainer>
    </HeaderConteiner>
  );
}

const HeaderConteiner = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  background-color: blue;
`;
const InfoContainer = styled.header`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
`;
const LogoContainer = styled.figure`
  display: flex;
  align-items: center;
  background-color: yellow;
  .img {
    height: 50px;
  }
`;
