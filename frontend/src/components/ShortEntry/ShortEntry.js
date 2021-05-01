import React from "react";
import classes from "./ShortEntry.module.scss";
import Dropdown from "react-dropdown";

const ShortEntry = (props) => {
  let query = null;

  if (props.dropdown) {
    query = (
      <Dropdown
        name={props.name}
        className={classes.dropDown}
        controlClassName={classes.control}
        placeholderClassName={classes.placeholder}
        options={props.data}
        value={props.data[0]}
        onChange={props.onChange}
      />
    );
  } else {
    query = (
      <input
        className={classes.input}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
      />
    );
  }

  return (
    <div className={classes.entry}>
      <h2 className={classes.label}>{props.text}</h2>
      {query}
    </div>
  );
};

export default ShortEntry;
