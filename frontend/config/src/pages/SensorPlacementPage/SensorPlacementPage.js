import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./SensorPlacementPage.module.scss";
import TopBar from "../../components/TopBar/TopBar";
import SelectedActivities from "../../components/SelectedActivities/SelectedActivities";
import SensorPlacementInfo from "../../components/SensorPlacementInfo/SensorPlacementInfo";

const SensorPlacementPage = (props) => {
  return (
    <>
      <TopBar />
      <div className={classes.sensorPlacement}>
        <div className={classes.content}>
          <SelectedActivities selected={props.activities} />
          <SensorPlacementInfo orbitControl={props.orbitControl} />
        </div>
        <div className={classes.userActionButtons}>
          <button
            className={
              props.orbitControl ? classes.rotateBody_Blue : classes.rotateBody
            }
            name="rotate body"
            onClick={props.switchAction}
          >
            rotate body
          </button>
          <button
            className={
              props.addSensor ? classes.addSensor_Blue : classes.addSensor
            }
            name="add sensor"
            onClick={props.switchAction}
          >
            add sensor
          </button>
          <button
            className={
              props.removeSensor
                ? classes.removeSensor_Blue
                : classes.removeSensor
            }
            name="remove sensor"
            onClick={props.switchAction}
          >
            remove sensor
          </button>
        </div>
        <div className={classes.routeBottons}>
          <button className={classes.back} onClick={props.routeBackToHomePage}>
            <Link
              className={classes.link_back}
              to={{
                pathname: "/",
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

export default SensorPlacementPage;
