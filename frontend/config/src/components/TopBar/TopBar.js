import React from "react";
import classes from "./TopBar.module.scss";

const topbar = (props) => {
  return (
    <div className={classes.topBar}>
      <h1 className={classes.h1}>IMUTube</h1>
    </div>
  );
};
export default topbar;
