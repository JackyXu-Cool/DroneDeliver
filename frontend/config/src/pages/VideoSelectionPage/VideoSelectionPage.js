import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./VideoSelectionPage.module.scss";
import TopBar from "../../components/TopBar/TopBar";
import SelectedActivities from "../../components/SelectedActivities/SelectedActivities";
import VideoSelectionSetup from "../../components/VideoSelectionSetup/VideoSelectionSetup";

const VideoSelectionPage = (props) => {
  return (
    <>
      <TopBar />
      <div className={classes.videoSelection}>
        <div className={classes.content}>
          <SelectedActivities
            selected={props.activities}
            onClick={props.switchActivity}
            currentActivity={props.currentActivity}
          />
          <VideoSelectionSetup />
        </div>
        <div className={classes.routeButtons}>
          <button
            className={classes.back}
            onClick={props.routeBackToActivityParameterPage}
          >
            <Link
              className={classes.linkBack}
              to={{
                pathname: "/video-parameters",
              }}
            >
              Back
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoSelectionPage;
