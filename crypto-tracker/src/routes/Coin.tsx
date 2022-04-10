import React from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

export default function Coin() {
  // const params = useParams<{coinId: string}>();
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: {coinId}</h1>;
}
