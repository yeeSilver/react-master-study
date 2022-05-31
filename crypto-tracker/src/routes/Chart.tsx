import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

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
  const coinId = useOutletContext() as ChartProps["coinId"];

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
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
                mode: "dark",
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
    </>
  );
}
