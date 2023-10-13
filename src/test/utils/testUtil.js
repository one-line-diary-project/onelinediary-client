import React from "react";
import { render as rtlRender } from "@testing-library/react";
import storeR from "../../store/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

function render(
  ui,
  { preloadedState = {}, store = storeR, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
