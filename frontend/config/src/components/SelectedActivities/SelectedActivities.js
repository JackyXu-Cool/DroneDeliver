import React from "react";

import SelectedActivity from "./SelectedActivity/SelectedActivity";
import classes from "./SelectedActivities.module.scss";

const SelectedActivities = (props) => {
  const selected = (
    <div className={classes.list}>
      {props.selected.map((activity) => {
        return (
          <SelectedActivity
            key={activity.id}
            name={activity.name}
            currentActivity={props.currentActivity}
          />
        );
      })}
    </div>
  );

  return (
    <div className={classes.SelectedActivities} onClick={props.onClick}>
      {selected}
    </div>
  );
};

export default SelectedActivities;
