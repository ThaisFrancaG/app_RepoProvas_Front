import FilePresentIcon from "@mui/icons-material/FilePresent";
import React, { useState } from "react";
import useAuth from "../../hooks/userAuth";
import * as style from "./footerStyle";
import Link from "@mui/material/Link";
export default function MainFooter(props) {
  return (
    <style.FooterConteiner>
      <style.Message>
        <FilePresentIcon sx={{ color: "#7857b1" }} /> Help us expand our
        database!
        <Link href="/add-test" underline="hover" color="#9575CD">
          {"Send a Test!"}
        </Link>
      </style.Message>
    </style.FooterConteiner>
  );
}
