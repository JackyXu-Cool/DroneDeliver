import React from "react";

import SuggestedActivity from "./SuggestedActivity/SuggestedActivity";
import classes from "./SuggestedActivities.module.scss";

const suggestedActivities = (props) => {
  const suggested = (
    <div className={classes.grid}>
      {props.suggested.map((activity, index) => {
        return (
          <SuggestedActivity
            click={props.click(index)}
            key={activity.id}
            name={activity.name}
          />
        );
      })}
    </div>
  );

  return (
    <div className={classes.suggestedActivities}>
      <p className={classes.paragraph}>Suggested</p>
      {suggested}
    </div>
  );
};

export default suggestedActivities;
