import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
 
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  font-family: 'Montserrat', sans-serif;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Global />
      <App />
    </BrowserRouter>
  </Provider>
);
