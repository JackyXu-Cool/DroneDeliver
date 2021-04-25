import React, { useState } from "react";
import classes from "./VideoSelectionSetup.module.scss";

const VideoSelectionSetup = (props) => {
  const hiddenFileInput = React.useRef(null);

  const chooseDirectory = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className={classes.videoSelectionSetup}>
      <div className={classes.message}>
        <h2 className={classes.title}>
          Select seed samples to search similar videos
        </h2>
        <p className={classes.videoSelectionMessage}>
          We need videos to process, and you can help up by selecting sample
          videos so that we can find more.
        </p>
      </div>
      <div className={classes.processingDirectory}>
        <h2 className={classes.processingDirectoryTitle}>
          Processing directory
        </h2>
        <button className={classes.chooseButton} onClick={chooseDirectory}>
          choose
        </button>
        <input
          className={classes.chooseDirectory}
          webkitdirectory=""
          directory=""
          type="file"
          id="ctrl"
          multiple
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
export default VideoSelectionSetup;
