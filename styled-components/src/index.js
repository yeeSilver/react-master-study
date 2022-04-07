import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";

const darkMode = {
  textColor: "whitesmoke",
  backgroundColor: "#333",
};

const lightMode = {
  textColor: "#111",
  backgroundColor: "white",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
