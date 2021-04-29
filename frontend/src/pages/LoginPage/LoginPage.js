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
          <Entry
            text={"Username: "}
            name="loginUsername"
            login={props.login}
            type="text"
            onChange={props.enterLogin}
          />
        </div>
        <div className={classes.entry}>
          <Entry
            text={"Password: "}
            name="loginPassword"
            login={props.login}
            type="password"
            onChange={props.enterLogin}
          />
        </div>
        <div className={classes.buttons}>
          <button className={classes.button_login} onClick={props.loginOnClick}>
            <Link
              to={props.canLogin && props.loginSuccess ? "/home" : "/login"}
              className={classes.link_login}
            >
              Login
            </Link>
          </button>
          <button className={classes.button_register}>
            <Link to="/register" className={classes.link_register}>
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
