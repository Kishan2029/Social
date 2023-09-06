import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
// { staleTime: 1000 * 60 }
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
