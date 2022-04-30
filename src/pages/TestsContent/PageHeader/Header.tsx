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
import * as headerStyle from "./style";
import SearchOptions from "./TestsOptions";
import SearchBar from "./SearchBar";
import { HoverIcons } from "../style";
export default function MainHeader(props) {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();

  const {
    filter,
    setFilter,
    setDisplaySearch,
    setSearchResults,
    toSearch,
    setToSearch,
  } = props;
  const navigate = useNavigate();
  async function logOut() {
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
    <headerStyle.HeaderConteiner>
      <headerStyle.InfoContainer>
        <headerStyle.LogoContainer className="eventIcons">
          <img src={logo} alt="logo" onClick={() => setDisplaySearch(false)} />
        </headerStyle.LogoContainer>
        <LogoutIcon
          className="eventIcons"
          color="primary"
          sx={{ fontSize: 60 }}
          onClick={() => setOpen(true)}
        />
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
      </headerStyle.InfoContainer>
      <SearchBar
        filter={filter}
        setDisplaySearch={setDisplaySearch}
        setSearchResults={setSearchResults}
        toSearch={toSearch}
        setToSearch={setToSearch}
      />
      <SearchOptions filter={filter} setFilter={setFilter} />
    </headerStyle.HeaderConteiner>
  );
}
