import styled from "styled-components";
import React, { useState } from "react";

//typescript에게 container가 bgColor를 받을 거라 얘기하면<ContainerProps>
//Container가 받는 props를 타입스크립트에게 잘 설명해줄거야.
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor}; //필수
  border: 5px solid ${(props) => props.borderColor}; //필수
  border-radius: 50%;
`;

interface ContainerProps {
  bgColor: string; //필수
  borderColor: string; //필수
}

interface CircleProps {
  bgColor: string;
  borderColor?: string; //선택사항
}

//bgColor의 타입은 CircleProps 의 object이다 라고 말하는 것

function Circle({ bgColor, borderColor }: CircleProps) {
  const [value, setValue] = useState<number | string>(0);

  return (
    <Container
      className="container"
      bgColor={bgColor}
      borderColor={borderColor ?? "white"}
    ></Container>
  );
}

export default Circle;
