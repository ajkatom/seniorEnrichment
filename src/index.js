import { render } from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";
import Main from "./main";

const root = document.getElementById("root");

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  root
);
