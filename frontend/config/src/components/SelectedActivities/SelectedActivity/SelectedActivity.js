import React from "react";
import classes from "./SelectedActivity.module.scss";

const selectedActivity = (props) => {
  let selected = classes.selectedActivity;

  if (props.currentActivity === props.name) {
    selected = classes.selectedActivityBlue;
  }

  return (
    <button className={selected} name={props.name} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default selectedActivity;
