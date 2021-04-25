import React from "react";
import { Link } from "react-router-dom";

import Entry from "../../components/Entry/Entry";

import classes from "./LoginPage.module.scss";

const LoginPage = (props) => {
  return (
    <div className={classes.loginPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>Login</h1>
        <div className={classes.entry}>
          <Entry text={"Username: "} />
        </div>
        <div className={classes.entry}>
          <Entry text={"Password: "} />
        </div>
        <div className={classes.buttons}>
          <button className={classes.button_login}>Login</button>
          <button className={classes.button_register}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
