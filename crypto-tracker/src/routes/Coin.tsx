import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Link,
  useMatch,
  Outlet,
} from "react-router-dom";
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

const Tab = styled.span<{ isActive: boolean }>`
  padding: 7px 0px;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;
  background-color: #859cb0;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

// interface RouteParams {
//   // coinId: string;
//   [coinId: string]: string;
// }

interface ILocation {
  name: string;
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

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as ILocation;
  // const { state } = useLocation() as ILocation;
  // const coinName = localStorage.getItem("coinName");

  //이렇게 하면 ts는 info가 <InfoData>라고 인식
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  // routeMatch에게 우리가 coin/price라는 URL에 있는 지 여부를 확인해달라고 물어보는 코드. 만약coinId/price에 유저가 있다면 priceMatch로 특정 값이 반환됨
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

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
      setLoading(false); //이걸 안해주면 계속 로딩이라는 창만 뜸
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        {/* state에 있는 이름을 바로 보여줄거야-> 홈페이지에서 코인을 클릭할 때만 true가 되겠지 이때 state가 형성되니까. 그런데 만약 홈페이지에서 넘어간게 아니라면 ->  loading중이라면 "Loading..."을 출력할 것이고 로딩 중이 아니라면 API로부터 받아온(infoData) name을 출력할 거야 */}
        <Title>
          {/* {coinName ? coinName : loading ? "Loading..." : info?.name} */}
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
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

          {/* chart & price tab */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={coinId} />
          {/* <Outlet /> */}
        </>
      )}
    </Container>
  );
}
export default Coin;
