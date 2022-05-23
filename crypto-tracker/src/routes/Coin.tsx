import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f3cfa3c9;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    margin-bottom: 5px;
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  padding: 7px 0px;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;
  background-color: #859cb0;
  font-size: 12px;
  font-weight: 400;
  a {
    display: block;
  }
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

interface InfoData {
  //이게 infoData라고 typeScript한테 알려준거야
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_a: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
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

  //이렇게 하면 ts는 info가 <InfoData>라고 인식
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); //이걸 안해주면 계속 loading중이라는 창만 뜨겠지
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        {/* state에 있는 이름을 바로 보여줄거야-> 홈페이지에서 코인을 클릭할 때만 true가 되겠지 이때 state가 형성되니까. 그런데 만약 홈페이지에서 넘어간게 아니라면 ->  loading중이라면 "Loading..."을 출력할 것이고 로딩 중이 아니라면 API로부터 받아온(infoData) name을 출력할 거야 */}
        <Title>
          {state.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
        {/* <Title>{coinName}</Title> */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Structure:</span>
              <span>{info?.org_structure}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description} </Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab>
              <Link to={`/${coinId}/chart`}>Chart</Link>
              {/* <Link to={`chart`}>Chart</Link> */}
            </Tab>
            <Tab>
              <Link to={`/${coinId}/price`}>Price</Link>
              {/* <Link to={`price`}>Price</Link> */}
            </Tab>
          </Tabs>
          {/* tab key 라우터를 만들면 path를 가져야 해*/}

          <Routes>
            {/* <Route path={`/:coinId/chart`} element={<Chart />} />
            <Route path={`/:coinId/price`} element={<Price />} /> */}
            <Route path=":price" element={<Price />} />
            <Route path=":chart" element={<Chart />} />
          </Routes>
        </>
      )}{" "}
    </Container>
  );
}
