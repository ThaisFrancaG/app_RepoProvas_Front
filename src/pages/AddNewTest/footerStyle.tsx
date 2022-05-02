import styled from "styled-components";
const FooterConteiner = styled.div`
  width: 100vw;
  height: 50px;

  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fcf9f99b;
`;

const Message = styled.span`
  display: flex;
  color: #9575cd;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export { FooterConteiner, Message };
