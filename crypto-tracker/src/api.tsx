const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

//암호화폐의 highest(가장 올랐을 때), loweat, close, volum을 array로 가지고 있는 데이터
export function fetchCoinHistory(coinId: string | undefined) {
  const endDate = Math.floor(Date.now() / 1000); //이거는 fetch할때 필수로 들어가야하는 props야 api 명세서에 있음
  const startDate = endDate - 60 * 60 * 24 * 7; //endDate으로부터 일주일 전
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
