import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./TrackAssignedDronesPage.module.scss";

const TrackAssignedDronesPage = (props) => {
    const drones = props.drones.map((entry, index) => {
        return (
            <ul className={index % 2 === 1 ? classes.entry_odd : classes.entry_even} key={index}>
                <li className={classes.entry_1}>{entry.Drone_ID}</li>
                <li className={classes.entry_2}>{entry.Drone_Status}</li>
                <li className={classes.entry_3}>{entry.Radius}</li>
            </ul>
        )
    })

    return (
      <div className={classes.TrackAssignedDronesPage}>
        <div className={classes.content}>
            <h1 className={classes.title}>My Assigned Drones</h1>
            <div className={classes.top}>
                <h2 className={classes.id_label}>Drone ID: </h2>
                <input className={classes.entry} name="drone_id" onChange={props.onEnter}/>
                <h2 className={classes.status_label}>Status: </h2>
                <select className={classes.droplist}  name="status" onChange={props.onEnter}>
                    <option value="None">None</option>
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                </select>
            </div>
            <ul className={classes.header_row}>
                    <li className={classes.header_1}>Drone ID</li>
                    <li className={classes.header_2}>Status</li>
                    <li className={classes.header_3}>Radius</li>
            </ul>
            <div className={classes.drones_container}>
                {drones}
            </div>
            <button className={classes.btn_back}>
                <Link className={classes.link_back} to="/home">Back</Link>
            </button>
            <button className={classes.btn_reset} onClick={props.onReset}>Reset</button>
            <button className={classes.btn_filter} onClick={props.onFilter}>Filter</button>
        </div>
    </div>
    );
  };
  
  export default TrackAssignedDronesPage;
  