import React from "react";

import classes from "./HomePage.module.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import SuggestedActivities from "../../components/SuggestedActivities/SuggestedActivities";
import TopBar from "../../components/TopBar/TopBar";
import ActivityConfirmationButton from "../../components/ActivityConfirmationButton/ActivityConfirmationButton";

const HomePage = (props) => {
  let activityConfirmation = null;

  if (props.hasActivities) {
    activityConfirmation = (
      <ActivityConfirmationButton onClick={props.routeToSearchParameters} />
    );
  }

  return (
    <>
      <TopBar />
      <div className={classes.home}>
        <div className={classes.content}>
          <div className={classes.title}>IMUTube</div>
          <SearchBox
            handleAddition={props.addActivityHandler}
            value={props.tags}
            onRemove={props.deleteActivityHandler}
          />
          <SuggestedActivities
            click={props.addFromSelected}
            suggested={props.suggested}
          />
        </div>
        {activityConfirmation}
      </div>
    </>
  );
};

export default HomePage;
