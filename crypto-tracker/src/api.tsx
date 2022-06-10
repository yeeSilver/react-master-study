const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  return await response.json();
}

export async function fetchCoinInfo(coinId: string | undefined) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await response.json();
}

export async function fetchCoinTickers(coinId: string | undefined) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  return await response.json();
}

//암호화폐의 highest(가장 올랐을 때), loweat, close, volum을 array로 가지고 있는 데이터
export async function fetchCoinHistory(coinId: string | undefined) {
  const endDate = Math.floor(Date.now() / 1000); //이거는 fetch할때 필수로 들어가야하는 props야 api 명세서에 있음
  const startDate = endDate - 60 * 60 * 20; //endDate으로부터20시간 전
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  );
  return await response.json();
}

export async function fetchTodayCoinHistory(coinId: string | undefined) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`);
  return await response.json();
}
