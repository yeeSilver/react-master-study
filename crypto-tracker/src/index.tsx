import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const rootElement = document.getElementById("root");
// 👇️ if you use TypeScript, add non-null (!) assertion operator
// rootElement 만 작성하면 에러가 남.
const root = createRoot(rootElement!);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
