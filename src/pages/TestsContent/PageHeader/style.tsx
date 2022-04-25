import styled from "styled-components";

const HeaderConteiner = styled.div`
  width: 100vw;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  background-color: #fcf9f99b;
`;
const InfoContainer = styled.header`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoContainer = styled.figure`
  display: flex;
  align-items: center;
  .img {
    height: 50px;
  }
`;

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
`;

export { HeaderConteiner, InfoContainer, LogoContainer, SearchBarContainer };
