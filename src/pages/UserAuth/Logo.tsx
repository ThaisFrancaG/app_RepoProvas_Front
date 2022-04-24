import React, { useState } from "react";
import styled from "styled-components";
// import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import logo from "../../assets/images/logo.png";
// import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

export default function LogoHeader() {
  return (
    <>
      <LogoConteiner>
        <img src={logo} alt="logo" />
        <Title>
          <span>REPOPROVAS</span>
        </Title>
      </LogoConteiner>
    </>
  );
}

const LogoConteiner = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
