import React from "react";
import { Link } from "react-router-dom";

import classes from "./ActivityConfirmationButton.module.scss";

const activityconfirmationbutton = (props) => {
  return (
    <button className={classes.activityConfirmation} onClick={props.onClick}>
      <Link
        className={classes.link}
        to={{
          pathname: "/search-parameters",
        }}
      >
        Next
      </Link>
    </button>
  );
};
export default activityconfirmationbutton;
