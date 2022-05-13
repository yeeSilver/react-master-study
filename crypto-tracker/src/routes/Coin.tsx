import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  /* font-family: "Beau Rivage", cursive; */
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface RouteParams {
  // coinId: string;
  [coinId: string]: string;
}

interface ILocation {
  state: {
    name: string;
  };
}

export default function Coin() {
  const [loading, setLoading] = useState(true);
  // const params = useParams<{coinId: string}>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation() as ILocation;
  //state가 뭔지 타입스크립트한테 알려줄 interface RouteState 작성해야함
  // const { state } = useLocation<RouteState>();
  // const coinName = localStorage.getItem("coinName");

  return (
    <Container>
      <Header>
        <Title>{state.name}</Title>
        {/* <Title>{coinName}</Title> */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}{" "}
    </Container>
  );
}
