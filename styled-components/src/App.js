import styled, { keyframes } from "styled-components";
import React from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const Emoji = styled.div`
  font-size: 24px;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  /* 삼항 연산자를 사용하고 싶다면 */
  background-color: ${(props) => (props.bgColor ? props.bgColor : "green")};

  animation: ${animation} 2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 20px;
    &:active {
      transform: scale(0.5);
    }
  }
  //Box안에 있는 Emoji에 적용되는 스타일
  ${Emoji}:hover {
    font-size: 40px;
  }
`;

const Input = styled.input.attrs({ required: true, maxLenght: 16 })`
  color: tomato;
`;

const colorAnimation = keyframes`
  from{
    color: green;
    background: gold;
  }
    to{
      color: white;
      background: teal;
    }
`;

const Btn = styled.button`
  /* background-color: white; 왜 백그라운드를 지정해줘야만 버튼 색상이 변경될까??*/
  animation: ${colorAnimation} 0.5s infinite;
  /* background-color: white; */
`;

function App() {
  return (
    <Wrapper>
      <Title>타이틀입니다</Title>
      {/* <Box>
        <span>🐥</span>
      </Box>
      <Box bgColor="gold">
        <Emoji>🚗</Emoji>
      </Box>
      <Input />
      <Btn>btn입니다</Btn> */}
    </Wrapper>
  );
}

export default App;
