import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";

import classes from "./App.module.scss";

const App = () => {
  return (
    <BrowserRouter className={classes.app}>
      <Route path={"/"} exact>
        <LoginPage />
      </Route>
    </BrowserRouter>
  );
};

export default App;
