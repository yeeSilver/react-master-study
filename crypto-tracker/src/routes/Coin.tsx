import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  // coinId: string;
  [coinId: string]: string;
}

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

export default function Coin() {
  const [loading, setLoading] = useState(true);
  // const params = useParams<{coinId: string}>();
  const { coinId } = useParams<RouteParams>();
  return (
    <Container>
      <Header>
        <Title>{coinId}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}{" "}
    </Container>
  );
}
