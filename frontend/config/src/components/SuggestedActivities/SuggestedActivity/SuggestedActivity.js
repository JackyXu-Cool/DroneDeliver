import React from "react";
import classes from "./SuggestedActivity.module.scss";

const suggestedActivity = (props) => {
  return (
    <div className="SuggestedActivity">
      <button
        onClick={props.click}
        className={classes.Button}
        name={props.name}
      >
        {props.name}
      </button>
    </div>
  );
};

export default suggestedActivity;
