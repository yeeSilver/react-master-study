import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { type } from "os";

interface ChartProps {
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
export default function Chart() {
  //1.useParams사용해서 coinId가져오기
  const params = useParams();
  //2.Outlet에서 가져오기
  // const props = useOutletContext() as ChartProps;
  // const coinId = props.coinId;
  const { coinId } = useOutletContext<ChartProps>();
  const isDark = useRecoilValue(isDarkAtom);
  // const isDark = false;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000,
    }
  );
  const open = data?.map((price) => price.open.toFixed(2));
  const high = data?.map((price) => price.high.toFixed(2));
  const low = data?.map((price) => price.low.toFixed(2));
  const close = data?.map((price) => price.close.toFixed(2));

  return (
    <>
      <div>
        {/* series라는 porps에 보낼 데이터를(차트에 보여줄) 넣어줌 */}
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ReactApexChart
            type="line"
            // series가 props로 받아야하는 건 number임. 그렇지만 data를 못받으면 undefined가 되기 때문에 number임을 강제로 알려야함. 그래서 as쓴 거임.
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                  show: false,
                },
                categories: data?.map((price) => price.time_close),
                type: "datetime",
              },
              theme: {
                mode: isDark ? "dark" : "light",
                palette: "palette5",
                monochrome: {
                  enabled: false,
                  color: "#255aee",
                  shadeTo: "light",
                  shadeIntensity: 0.65,
                },
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
              },
              colors: ["aqua"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>

      <div>
        {/* candle chart */}
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ReactApexChart
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                type: "candlestick",
                height: 350,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                  // show: false,
                  datetimeFormatter: {
                    year: "yyyy",
                    month: "MMM 'yy",
                    day: "dd MMM",
                    hour: "HH:mm",
                  },
                },
                type: "datetime",
              },
            }}
            series={[
              {
                data: [
                  {
                    x: Math.floor(Date.now() / 1000),
                    y: [
                      open ? open[0] : 0,
                      high ? high[0] : 0,
                      low ? low[0] : 0,
                      close ? close[0] : 0,
                    ],
                  },
                  {
                    x: Math.floor(Date.now() / 1000) - 60 * 60 * 20,
                    y: [
                      open ? open[1] : 0,
                      high ? high[1] : 0,
                      low ? low[1] : 0,
                      close ? close[1] : 0,
                    ],
                  },
                ],
              },
            ]}
            type="candlestick"
            height={350}
          />
        )}
      </div>
    </>
  );
}
Math.floor(Date.now() / 1000);
