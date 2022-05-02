import styled from "styled-components";

const HeaderConteiner = styled.div`
  width: 100vw;
  max-height: 250px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fcf9f99b;
`;
const InfoContainer = styled.header`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  object-fit: contain;
`;
const LogoContainer = styled.figure`
  height: 100%;
  display: flex;
  align-items: center;
  object-fit: contain;

  .img {
    height: 100%;
    width: 100%;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export { HeaderConteiner, InfoContainer, LogoContainer, SearchBarContainer };
