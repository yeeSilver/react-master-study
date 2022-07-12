import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={undefined}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
