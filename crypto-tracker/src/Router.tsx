import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 두 번째 라우터는 Coin 스크린 렌더링 
        path="/:coinId" 였는데 바꿈*/}
        <Route path=":coinId">
          <Coin />
        </Route>

        {/* 첫 번째 라우터는 Coins 스크린을 렌더링 함 path="/" 였는데 바꿈 */}
        <Route path=".">
          <Coins />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
