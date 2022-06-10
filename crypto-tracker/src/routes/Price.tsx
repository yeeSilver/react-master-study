import { useOutletContext } from "react-router";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { useQuery } from "react-query";
import { fetchTodayCoinHistory } from "../api";
import styled from "styled-components";

const PriceTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 28px;
  margin: 20px;
  font-family: "Beau Rivage", cursive;
  text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #cbf0fbc7;
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
interface PriceProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchTodayCoinHistory(coinId),
    {
      refetchInterval: 1000,
    }
  );
  const t_open = data ? data[0].open.toFixed(2) : 0;
  const t_close = data ? data[0].close.toFixed(2) : 0;
  const t_high = data ? data[0].high.toFixed(2) : 0;
  const t_low = data ? data[0].low.toFixed(2) : 0;
  const t_market_cap = data ? data[0].market_cap : 0;
  const t_volume = data ? data[0].volume : 0;
  const dataArray = [t_open, t_close, t_high, t_low] as number[];
  console.log(dataArray);
  return (
    <>
      <PriceTitle>Today's detail Price</PriceTitle>
      <Overview>
        <OverviewItem>
          <span>Market cap:</span>
          <span>{`$${t_market_cap}`}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Volume:</span>
          <span>{`$${t_volume}`}</span>
        </OverviewItem>
      </Overview>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ReactApexChart
            type="bar"
            series={[
              {
                data: dataArray,
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
                palette: "palette5",
                monochrome: {
                  enabled: false,
                  shadeTo: "light",
                  shadeIntensity: 0.65,
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value}`,
                },
              },
              chart: {
                type: "bar",
                height: 350,
                toolbar: {
                  show: false,
                },
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },

              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                  show: false,
                },
                categories: ["open", "close", "high", "low"],
              },
            }}
            height={350}
          />
        )}
      </div>
    </>
  );
}
