import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
const CoinsList = styled.ul``;

const Coin = styled.li`
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

const Icon = styled.img`
  width: 35px;
  height: 35px;
  vertical-align: middle;
  margin-right: 15px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// const handleSave = (coinName: string) => {
//   localStorage.setItem("coinName", coinName);
// };

export default function Coins() {
  //리액트쿼리의 훅인 유즈 쿼리가 fetchCoins를 실행하고 함수가 로딩중이라면(isLoading) true값을 반환, 함수가 로딩이 끝나면 false 반환 그리고 함수의 반환 데이터를 data에 저장
  //데이터가 뭔지 ts한테 정의해줘야해 : <CoinInterface[]>
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

  return (
    <>
      <Container>
        <Header>
          <Title>Check Out Coins</Title>
        </Header>
        {/* 코인을 다 받아왔을 때만 로딩은 false임.  */}
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {/* coins의 coin마다 UI를 보여주고 싶어 &rarr;는 오른쪽 화살표임*/}
            {/* 데이터중에 100개의 코인에 대해서만 보여주고 싶다 data.slice(0,100).map((~)) */}

            {data?.slice(0, 100).map((coin) => (
              // <Coin key={coin.id} onClick={() => handleSave(coin.name)}>
              <Coin key={coin.id}>
                {/* state는 coins -> coin으로 화면 전환을 할 때 생성되고 전송됨 */}
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name }}
                  // to={{
                  //   pathname: `/${coin.id}`,
                  // }}
                >
                  <Icon
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  <p>{coin.name} &rarr;</p>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}
