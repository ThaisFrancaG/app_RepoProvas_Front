import styled from "styled-components";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
  width: 100vw;
  height: 100vh;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 430px) {
    flex-direction: column;
    justify-content: start;
  }
`;
