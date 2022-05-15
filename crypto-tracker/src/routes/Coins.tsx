import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const handleSave = (coinName: string) => {
  localStorage.setItem("coinName", coinName);
};

export default function Coins() {
  // State가 .coin으로 된 array임을 설정.
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  // useEffect : 특정한 시기에 코드를 실행하기 위함. 컴포넌트 시작점에서만 실행되도록 해보자.
  useEffect(() => {
    //(함수)(); => 함수 정의하고 바로 실행해줌
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Check Out Coins</Title>
        </Header>
        {/* 코인을 다 받아왔을 때만 로딩은 false임.  */}
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {/* coins의 coin마다 UI를 보여주고 싶어 &rarr;는 오른쪽 화살표임*/}
            {coins.map((coin) => (
              <Coin key={coin.id} onClick={() => handleSave(coin.name)}>
                {/* state는 coins -> coin으로 화면 전환을 할 때 생성되고 전송됨 */}
                <Link
                  state={{ name: coin.name }}
                  to={{
                    pathname: `/${coin.id}`,
                    // state: { name: coin.name },
                  }}
                >
                  <Icon
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}
