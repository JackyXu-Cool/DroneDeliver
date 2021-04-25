import React from "react";
import classes from "./Entry.module.scss";

const Entry = (props) => {
  return (
    <div className={classes.entry}>
      <h2 className={classes.label}>{props.text}</h2>
      <input className={classes.input} />
    </div>
  );
};

export default Entry;
