import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./SearchParameterPage.module.scss";
import TopBar from "../../components/TopBar/TopBar";
import SelectedActivities from "../../components/SelectedActivities/SelectedActivities";
import SearchParameterInfo from "../../components/SearchParameterInfo/SearchParameterInfo";

const SearchParameterPage = (props) => {
  //console.log(props.videoParameters);
  let nextButton = null;
  let pathName = "/search-parameters";
  let popUp = null;

  if (props.allSearchParametersCompleted) {
    pathName = "/sensor-placement"; //need that pathName of next page
  } else if (props.checkPopUp) {
    popUp = (
      <>
        <div className={classes.overlay_left} />
        <div className={classes.overlay_right} />
        <div className={classes.overlay_top} />
        <div className={classes.overlay_bottom} />
        <div className={classes.overlay}>
          <div className={classes.popup}>
            <div className={classes.square} />
            <h2 className={classes.warning}>
              Would you like to apply these parameters to all activities?
            </h2>
            <p className={classes.warningMessage}>
              You have yet entered video parameters for all activities. However,
              we can help you apply video parameters of this activity to all
              incomplete activities.
            </p>
            <div className={classes.actions}>
              <button
                className={classes.applyAll}
                onClick={props.applyAllSearchParameters}
              >
                Yes, apply to all!
              </button>
              <button
                className={classes.manually}
                onClick={props.applyManually}
              >
                No, I will apply manually
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (props.hasSearchParameters) {
    nextButton = (
      <button
        className={classes.next}
        onClick={props.routeToSensorPlacementPage}
      >
        <Link
          className={classes.link_next}
          to={{
            pathname: pathName,
          }}
        >
          Next
        </Link>
      </button>
    );
  } else {
    nextButton = (
      <button
        className={classes.nextDisabled}
        onClick={props.routeToSensorPlacementPage}
      >
        <Link
          className={classes.link_next}
          to={{
            pathname: pathName,
          }}
        >
          Next
        </Link>
      </button>
    );
  }

  const searchparamquery = (
    <SearchParameterInfo
      currentActivity={props.currentActivity}
      display={props.currentDisplay}
      searchParameters={props.searchParameters}
      onChange={props.updateSearchParametersHandler}
      switched={props.switched}
    />
  );

  return (
    <>
      <TopBar />
      <div className={classes.searchParamaters}>
        {popUp}
        <div className={classes.content}>
          <SelectedActivities
            selected={props.activities}
            onClick={props.switchActivity}
            currentActivity={props.currentActivity}
          />
          {searchparamquery}
        </div>
        <div className={classes.routeButtons}>
          <button className={classes.back} onClick={props.routeBackToHomePage}>
            <Link
              className={classes.linkBack}
              to={{
                pathname: "/",
              }}
            >
              Back
            </Link>
          </button>
          {nextButton}
        </div>
      </div>
    </>
  );
};

export default SearchParameterPage;
