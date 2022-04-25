import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 430px) {
    flex-direction: column;
    justify-content: start;
  }
`;
