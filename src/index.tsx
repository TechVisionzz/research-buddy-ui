import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { GlobalVars, tokenstore } from "./global/global";
ReactDOM.render(
  <ConfigProvider direction={tokenstore.direction}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
