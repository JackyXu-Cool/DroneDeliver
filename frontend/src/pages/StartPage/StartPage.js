import React from "react";
import { Link } from "react-router-dom";

import classes from "./StartPage.module.scss";

const StartPage = (props) => {
  return (
    <div className={classes.startPage}>
      <div className={classes.content}>
        <button className={classes.start}>
          <Link to="login" className={classes.link}>
            Start
          </Link>
        </button>
      </div>
    </div>
  );
};

export default StartPage;
