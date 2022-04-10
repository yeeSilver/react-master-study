import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* 첫 번째 라우터는 Coins 스크린을 렌더링 함 */}
        <Route path="/">
          <Coins />
        </Route>

        {/* 두 번째 라우터는 Coin 스크린 렌더링 */}
        <Route path="/:coinId">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
