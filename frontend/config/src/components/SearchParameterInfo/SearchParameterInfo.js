import React, { useState } from "react";
import classes from "./SearchParameterInfo.module.scss";

const SearchParameterInfo = (props) => {
  const [value, setValue] = useState(0);

  const useForceUpdate = (event) => {
    setValue(value + 1);
  };

  let switched = props.switched;
  let display = {};

  if (switched) {
    display = props.display;
  }

  console.log("current: ", props.currentActivity);
  console.log("display: ", props.display);
  //console.log("switched", switched);
  //console.log("Current resolution:" + props.currentActivity);

  return (
    <div className={classes.searchParameterInfo}>
      <div className={classes.message}>
        <h2 className={classes.title}>Define parameters for video search</h2>
        <p className={classes.searchParameterMessage}>
          Add video parameters here
        </p>
      </div>
      <div className={classes.parametersMain}>
        <div className={classes.heightRange}>
          <h2 className={classes.heightRangeTitle}>Body height range</h2>
          <p className={classes.heightRangeMessage}>
            Enter body height range here
          </p>
          <div className={classes.heightInput}>
            <div className={classes.heightMessage}>
              <p className={classes.heightMessageFrom}>From</p>
              <p className={classes.heightMessageTo}>To</p>
            </div>
            <div className={classes.heightQuery}>
              <input
                className={classes.heightFromFt}
                name="fromFt"
                onChange={props.onChange}
                value={display.fromFt}
                type="number"
              />
              <h3 className={classes.ft1}>ft</h3>
              <input
                className={classes.heightFromIn}
                name="fromIn"
                onChange={props.onChange}
                value={display.fromIn}
                type="number"
              />
              <h3 className={classes.in1}>in</h3>
              <input
                className={classes.heightToFt}
                name="toFt"
                onChange={props.onChange}
                value={display.toFt}
                type="number"
              />
              <h3 className={classes.ft2}>ft</h3>
              <input
                className={classes.heightToIn}
                name="toIn"
                onChange={props.onChange}
                value={display.toIn}
                type="number"
              />
              <h3 className={classes.in2}>in</h3>
            </div>
          </div>
        </div>
        <div className={classes.bmiRange}>
          <h2 className={classes.bmiRangeTitle}>Body BMI range</h2>
          <p className={classes.bmiRangeMessage}>Enter Body BMI range here</p>
          <div className={classes.bmiInput}>
            <div className={classes.bmiMessage}>
              <p className={classes.bmiMessageFrom}>From</p>
              <p className={classes.bmiMessageTo}>To</p>
            </div>
            <div className={classes.bmiQuery}>
              <input
                className={classes.bmiFrom}
                name="fromBMI"
                onChange={props.onChange}
                value={display.fromBMI}
                type="number"
              />
              <input
                className={classes.bmiTo}
                name="toBMI"
                onChange={props.onChange}
                value={display.toBMI}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className={classes.humanNum}>
          <h2 className={classes.humanNumTitle}>Human tracking per video</h2>
          <p className={classes.humanNumMessage}>
            Enter human tracking per video here
          </p>
          <div className={classes.humanNumQuery}>
            <input
              className={classes.humanNumInput}
              name="numPeople"
              onChange={props.onChange}
              value={display.numPeople}
              type="number"
            />
            <h3 className={classes.people}>people</h3>
          </div>
        </div>
        <div className={classes.videoDuration}>
          <h2 className={classes.videoDurationTitle}>
            Range of video duration
          </h2>
          <p className={classes.videoDurationMessage}>
            Enter range of video duration here
          </p>
          <div className={classes.durationLabel}>
            <p className={classes.durationFrom}>From</p>
            <p className={classes.durationTo}>To</p>
          </div>
          <div className={classes.videoDurationQuery}>
            <input
              className={classes.fromDurationInput}
              name="fromMin"
              onChange={props.onChange}
              value={display.fromMin}
              type="number"
            />
            <h3 className={classes.fromDuration}>min</h3>
            <input
              className={classes.toDurationInput}
              name="toMin"
              onChange={props.onChange}
              value={display.toMin}
              type="number"
            />
            <h3 className={classes.toDuration}>min</h3>
          </div>
        </div>
        <div className={classes.videoResolution}>
          <h2 className={classes.videoResolutionTitle}>Video Resolution</h2>
          <p className={classes.videoResolutionMessage}>
            Select video resolution here
          </p>
          <div className={classes.videoResolutionOptions}>
            <div className={classes.option1}>
              <label className={classes.label} htmlFor="resolution">
                1080p60
              </label>
              <input
                type="radio"
                id="1080p60"
                name="resolution"
                value="1080p60"
                checked={props.display.resolution === "1080p60"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton1}
              />
            </div>
            <div className={classes.option2_6}>
              <label className={classes.label} htmlFor="720p60">
                720p60
              </label>
              <input
                type="radio"
                id="720p60"
                name="resolution"
                value="720p60"
                checked={props.display.resolution === "720p60"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton2_6}
              />
            </div>
            <div className={classes.option2_6}>
              <label className={classes.label} htmlFor="480p">
                480p
              </label>
              <input
                type="radio"
                id="480p"
                name="resolution"
                value="480p"
                checked={props.display.resolution === "480p"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton2_6}
              />
            </div>
            <div className={classes.option2_6}>
              <label className={classes.label} htmlFor="360p">
                360p
              </label>
              <input
                type="radio"
                id="360p"
                name="resolution"
                value="360p"
                checked={props.display.resolution === "360p"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton2_6}
              />
            </div>
            <div className={classes.option2_6}>
              <label className={classes.label} htmlFor="240p">
                240p
              </label>
              <input
                type="radio"
                id="240p"
                name="resolution"
                value="240p"
                checked={props.display.resolution === "240p"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton2_6}
              />
            </div>
            <div className={classes.option2_6}>
              <label className={classes.label} htmlFor="144p">
                144p
              </label>
              <input
                type="radio"
                id="144p"
                name="resolution"
                value="144p"
                checked={props.display.resolution === "144p"}
                onChange={props.onChange}
                onClick={useForceUpdate}
                className={classes.radioButton2_6}
              />
            </div>
          </div>
        </div>
        <div className={classes.videoNum}>
          <h2 className={classes.videoNumTitle}>
            Number of videos for IMU data processing
          </h2>
          <p className={classes.videoNumMessage}>
            Enter number of videos to process here
          </p>
          <div className={classes.videoNumQuery}>
            <input
              className={classes.videoNumInput}
              name="numVideo"
              onChange={props.onChange}
              value={display.numVideo}
              type="number"
            />
            <h3 className={classes.videos}>videos</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchParameterInfo;
