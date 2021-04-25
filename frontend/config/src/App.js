import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import classes from "./App.module.scss";

import HomePage from "./pages/HomePage/HomePage";
import SearchParameterPage from "./pages/SearchParametersPage/SearchParameterPage";
import VideoSelectionPage from "./pages/VideoSelectionPage/VideoSelectionPage";
import SensorPlacementPage from "./pages/SensorPlacementPage/SensorPlacementPage";

const App = () => {
  /* Global States */
  const [activities, setActivities] = useState([]);
  const [hasActivities, setHasActivites] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("");
  const [switched, setSwitch] = useState(false);
  const [currentDisplay, setDisplay] = useState({});
  const [checkPopUp, setCheckPopUp] = useState(false);

  const [currentPath, setCurrentPath] = useState("/");

  /* Homapage States */
  const [tags, setTags] = useState([]);
  const suggested = [
    { id: "Singing", name: "Singing" },
    { id: "Dancing", name: "Dancing" },
    { id: "Kicking", name: "Kicking" },
    { id: "Typing", name: "Typing" },
    { id: "Running", name: "Running" },
    { id: "Lifting", name: "Lifting" },
  ];

  /* Search Parameter States */
  const [searchParameters, setSearchParameters] = useState([]);
  const [hasSearchParameters, setHasSearchParameters] = useState(false);
  const [
    allSearchParametersCompleted,
    setAllSearchParametersCompleted,
  ] = useState(false);

  /* Sensor Placement States */
  const [sensors, setSensors] = useState([]);
  const [userActions, setUserActions] = useState({
    rotateBody: true,
    add: false,
    remove: false,
  });

  /***----------------------------Homepage Handlers-----------------------------***/
  const addFromSelected = (event) => {
    const suggested = event.target.name.toString();
    console.log({
      id: suggested,
      text: suggested,
    });
    if (!activities.some((a) => a.id === suggested && a.name === suggested)) {
      const tempActivities = [...activities];
      const tempTags = [...tags];
      tempTags.push({
        id: suggested,
        text: suggested,
      });
      tempActivities.push({
        id: suggested,
        name: suggested,
      });
      setHasActivites(true);
      setActivities(tempActivities);
      setTags(tempTags);
      console.log("activities:", activities);
    }
  };

  const addActivityHandler = (tag) => {
    const tempTags = [...tags];
    tempTags.push(tag);
    console.log(tags);
    const tempActivities = [...activities];
    tempActivities.push({
      id: tag.id,
      name: tag.text,
    });

    setTags(tempTags);
    setActivities(tempActivities);
    setHasActivites(true);
  };

  const deleteActivityHandler = (index) => {
    const tempTags = [...tags];
    const tempActivities = [...activities];

    tempTags.splice(index, 1);
    tempActivities.splice(index, 1);

    console.log(tempTags);

    if (tempTags.length === 0) {
      setHasActivites(false);
    }

    setTags(tempTags);
    setActivities(tempActivities);
  };

  const routeToSearchParameters = (event) => {
    const temp = [];
    console.log("activity length: ", activities.length);

    for (var i = 0; i < activities.length; i++) {
      let current = activities[i];
      let currentId = current.id;
      let flag = false;
      let tempActivity = {};
      for (var j = 0; j < searchParameters.length; j++) {
        if (searchParameters[j].id === currentId) {
          flag = true;
          tempActivity = searchParameters[j];
          break;
        }
      }
      if (flag) {
        temp.push(tempActivity);
      } else {
        temp.push({
          id: currentId,
          fromFt: "",
          fromIn: "",
          toFt: "",
          toIn: "",
          fromBMI: "",
          toBMI: "",
          numPeople: "",
          numVideo: "",
          fromMin: "",
          toMin: "",
          resolution: "",
        });
      }
    }

    console.log("temp: ", temp);
    setSearchParameters(temp);
    //console.log("actvitivy params", activityParameters);
    setCurrentActivity(activities[0].id);
    setDisplay(temp[0]);

    if (
      temp[0].forFt !== "" &&
      temp[0].forIn !== "" &&
      temp[0].toFt !== "" &&
      temp[0].toIn !== "" &&
      temp[0].fromBMI !== "" &&
      temp[0].toBMI !== "" &&
      temp[0].numPeople !== "" &&
      temp[0].numVideo !== "" &&
      temp[0].fromMin !== "" &&
      temp[0].toMin !== "" &&
      temp[0].resolution !== ""
    ) {
      setHasSearchParameters(true);
    } else {
      setHasSearchParameters(false);
    }

    setSwitch(true);
    setCurrentPath("/search-parameters");
  };
  /***-------------------------End of Homepage Handlers-----------------------------***/

  /***-----------------------Search Parameter Page Handlers-----------------------***/

  const updateSearchParametersHandler = (event) => {
    setSwitch(false);
    console.log(switched);
    const name = event.target.name;
    let value = event.target.value;
    const temp = searchParameters;

    for (var i = 0; i < searchParameters.length; i++) {
      if (searchParameters[i].id === currentActivity) {
        if (name === "fromFt") {
          temp[i].fromFt = value;
        } else if (name === "fromIn") {
          temp[i].fromIn = value;
        } else if (name === "toFt") {
          temp[i].toFt = value;
        } else if (name === "toIn") {
          temp[i].toIn = value;
        } else if (name === "fromBMI") {
          temp[i].fromBMI = value;
        } else if (name === "toBMI") {
          temp[i].toBMI = value;
        } else if (name === "numPeople") {
          temp[i].numPeople = value;
        } else if (name === "numVideo") {
          temp[i].numVideo = value;
        } else if (name === "fromMin") {
          temp[i].fromMin = value;
        } else if (name === "toMin") {
          temp[i].toMin = value;
        } else if (name === "resolution") {
          temp[i].resolution = value;
        }

        const activity = temp[i];
        if (activity.id === currentActivity) {
          if (
            activity.fromFt !== "" &&
            activity.fromIn !== "" &&
            activity.fromBMI !== "" &&
            activity.toBMI !== "" &&
            activity.toIn !== "" &&
            activity.toFt !== "" &&
            activity.numPeople !== "" &&
            activity.numVideo !== "" &&
            activity.fromMin !== "" &&
            activity.toMin !== "" &&
            activity.resolution !== ""
          ) {
            setHasSearchParameters(true);
            break;
          } else {
            setHasSearchParameters(false);
          }
        }
        //setDisplay(temp[i]);
        //break;
      }
    }

    let flag = true;
    for (var j = 0; j < temp.length; j++) {
      const temp_activity = temp[j];
      if (
        temp_activity.fromFt === "" ||
        temp_activity.fromIn === "" ||
        temp_activity.fromBMI === "" ||
        temp_activity.toBMI === "" ||
        temp_activity.toIn === "" ||
        temp_activity.toFt === "" ||
        temp_activity.numPeople === "" ||
        temp_activity.numVideo === "" ||
        temp_activity.fromMin === "" ||
        temp_activity.toMin === "" ||
        temp_activity.resolution === ""
      ) {
        setAllSearchParametersCompleted(false);
        flag = false;
        break;
      }
    }

    if (flag) {
      setAllSearchParametersCompleted(true);
    }

    setSearchParameters(temp);
    //console.log("video parameters: ", videoParameters);
  };

  const switchSearchParameters = (event) => {
    const name = event.target.name;
    const prev = currentActivity;
    if (name !== prev) {
      setSwitch(true);
      setHasSearchParameters(false);
      console.log("switched!!");
      //console.log(currentPath);
    }
    setCurrentActivity(name);

    for (var i = 0; i < searchParameters.length; i++) {
      if (searchParameters[i].id === name) {
        setDisplay(searchParameters[i]);
        if (switched) {
          if (
            searchParameters[i].fromFt !== "" &&
            searchParameters[i].fromIn !== "" &&
            searchParameters[i].fromBMI !== "" &&
            searchParameters[i].toBMI !== "" &&
            searchParameters[i].toIn !== "" &&
            searchParameters[i].toFt !== "" &&
            searchParameters[i].numPeople !== "" &&
            searchParameters[i].numVideo !== "" &&
            searchParameters[i].fromMin !== "" &&
            searchParameters[i].toMin !== "" &&
            searchParameters[i].resolution !== ""
          ) {
            setHasSearchParameters(true);
          }
        }
        break;
      }
    }

    for (var i = 0; i < searchParameters.length; i++) {
      if (searchParameters[i].id === name) {
        const activity = searchParameters[i];
        if (activity.id === name) {
          if (
            activity.fromFt !== "" &&
            activity.fromIn !== "" &&
            activity.fromBMI !== "" &&
            activity.toBMI !== "" &&
            activity.toIn !== "" &&
            activity.toFt !== "" &&
            activity.numPeople !== "" &&
            activity.numVideo !== "" &&
            activity.fromMin !== "" &&
            activity.toMin !== "" &&
            activity.resolution !== ""
          ) {
            setHasSearchParameters(true);
          }
          break;
        }
      }
    }
  };

  const routeBackToHomePage = (event) => {
    setCurrentPath("/");
    //setCurrentActivity(activityParameters[0].id);
    //setDisplay(activityParameters[0]);
    setHasSearchParameters(true);
  };

  const routeToSensorPlacementPage = (event) => {
    if (allSearchParametersCompleted) {
      setCheckPopUp(false);
      const temp = [];
      for (var i = 0; i < activities.length; i++) {
        let current = activities[i];
        let currentId = current.id;
        let flag = false;
        let tempActivity = {};
        for (var j = 0; j < searchParameters.length; j++) {
          if (searchParameters[j].id === currentId) {
            flag = true;
            tempActivity = searchParameters[j];
            break;
          }
        }
        if (flag) {
          temp.push(tempActivity);
        } else {
          temp.push({
            id: currentId,
            sensorLocations: [],
          });
        }
      }
      console.log("temp: ", temp);
      setSensors(temp);
      //console.log("sensors", videoParameters);
      setCurrentActivity(activities[0].id);
      setDisplay(temp[0]);
      setSwitch(true);
    } else {
      setCheckPopUp(true);
    }
  };

  const applyAllSearchParameters = (event) => {
    var temp = [];
    var base = null;

    //console.log("ACPs:", videoParameters);

    console.log("current display: ", currentDisplay);
    for (var i = 0; i < searchParameters.length; i++) {
      if (searchParameters[i].id === currentActivity) {
        setDisplay(searchParameters[i]);
        base = searchParameters[i];
      }
    }

    for (var i = 0; i < searchParameters.length; i++) {
      console.log("here");
      const temp_activity = searchParameters[i];
      if (
        temp_activity.fromFt === "" ||
        temp_activity.fromIn === "" ||
        temp_activity.toFt === "" ||
        temp_activity.toIn === "" ||
        temp_activity.fromBMI === "" ||
        temp_activity.toBMI === "" ||
        temp_activity.numPeople === "" ||
        temp_activity.numVideo === "" ||
        temp_activity.fromMin === "" ||
        temp_activity.toMin === "" ||
        temp_activity.resolution === ""
      ) {
        temp.push({
          id: temp_activity.id,
          fromFt: base.fromFt,
          fromIn: base.fromIn,
          toFt: base.toFt,
          toIn: base.toIn,
          fromBMI: base.fromBMI,
          toBMI: base.toBMI,
          numPeople: base.numPeople,
          numVideo: base.numVideo,
          fromMin: base.fromMin,
          toMin: base.toMin,
          resolution: base.resolution,
        });
      } else {
        temp.push({
          id: temp_activity.id,
          fromFt: temp_activity.fromFt,
          fromIn: temp_activity.fromIn,
          toFt: temp_activity.toFt,
          toIn: temp_activity.toIn,
          fromBMI: temp_activity.fromBMI,
          toBMI: temp_activity.toBMI,
          numPeople: temp_activity.numPeople,
          numVideo: temp_activity.numVideo,
          fromMin: temp_activity.fromMin,
          toMin: temp_activity.toMin,
          resolution: temp_activity.resolution,
        });
      }
    }
    setSearchParameters(temp);
    setAllSearchParametersCompleted(true);
    setCheckPopUp(false);
    setHasSearchParameters(true);
    console.log("ACPs:", temp);
    setSwitch(true);
  };

  const applyManually = (event) => {
    setCheckPopUp(false);
  };

  /***---------------------End of Search Parameter Page Handlers------------------***/

  /***------------------------Sensor Placement Page Handlers----------------------***/
  const switchAction = (event) => {
    console.log(event.target.name);
    if (event.target.name === "rotate body") {
      setUserActions({
        rotateBody: true,
        add: false,
        remove: false,
      });
    } else if (event.target.name === "add sensor") {
      setUserActions({
        rotateBody: false,
        add: true,
        remove: false,
      });
    } else if (event.target.name === "remove sensor") {
      setUserActions({
        rotateBody: false,
        add: false,
        remove: true,
      });
    }
  };

  /***---------------------End of Sensor Placement Page Handlers------------------***/

  /***-----------------------Video Selection Page Handlers-----------------------***/
  //Video Selection Page Handlers here

  /***--------------------End of Video Selection Page Handlers-------------------***/

  return (
    <BrowserRouter className={classes.app}>
      <Route path={"/"} exact>
        <HomePage
          hasActivities={hasActivities}
          suggested={suggested}
          tags={tags}
          addActivityHandler={addActivityHandler}
          deleteActivityHandler={deleteActivityHandler}
          addFromSelected={() => addFromSelected}
          routeToSearchParameters={routeToSearchParameters}
        />
      </Route>
      <Route path={"/search-parameters"} exact>
        <SearchParameterPage
          activities={activities}
          searchParameters={searchParameters}
          currentActivity={currentActivity}
          switched={switched}
          currentDisplay={currentDisplay}
          hasSearchParameters={hasSearchParameters}
          allSearchParametersCompleted={allSearchParametersCompleted}
          checkPopUp={checkPopUp}
          updateSearchParametersHandler={updateSearchParametersHandler}
          switchActivity={switchSearchParameters}
          routeBackToHomePage={routeBackToHomePage}
          routeToSensorPlacementPage={routeToSensorPlacementPage}
          applyManually={applyManually}
          applyAllSearchParameters={applyAllSearchParameters}
        />
      </Route>
      <Route path={"/sensor-placement"} exact>
        <SensorPlacementPage
          activities={activities}
          orbitControl={userActions.rotateBody}
          addSensor={userActions.add}
          removeSensor={userActions.remove}
          switchAction={switchAction}
        />
      </Route>
      <Route path={"/video-selection"} exact>
        <VideoSelectionPage
          activities={activities}
          currentActivity={currentActivity}
          switched={switched}
          currentDisplay={currentDisplay}
        />
      </Route>
    </BrowserRouter>
  );
};

export default App;
