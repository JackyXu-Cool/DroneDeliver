import React from "react";
import { Link } from "react-router-dom";

import classes from "./ViewDronesPage.module.scss";

const ViewDronesPage = (props) => {
    const dronesEntries = props.displayedDrones.map((entry, index) => {
        return (<ul className={index % 2 === 1 ? classes.drone_entry_odd : classes.drone_entry_even} key={entry["ID"]}>
            <li className={classes.drone_id_entry}>{entry["ID"]}</li>
            <li className={classes.operator_entry}>{entry["DroneTech"]}</li>
            <li className={classes.radius_entry}>{entry["Radius"]}</li>
            <li className={classes.zip_entry}>{entry["Zip"]}</li>
            <li className={classes.status_entry}>{entry["DroneStatus"]}</li>
        </ul>);
    });

    return (
        <div className={classes.ViewDronesPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>Chain Manager View Drones</h1>
                <div className={classes.top_entry_row}>
                    <h2 className={classes.drone_id_label}>
                        Drone Id:
                    </h2>
                    <input
                        className={classes.input_entry}
                        name="droneID"
                        type="text"
                        onChange={props.onEnter}
                    />
                    <h2 className={classes.radius_label}>
                        Radius:
                    </h2>
                    <input
                        className={classes.input_entry}
                        name="radius"
                        type="text"
                        onChange={props.onEnter}
                    />
                </div>
                <div className={classes.top_btn_row}>
                    <h2 className={classes.sort_by_label}>Sort by: </h2>
                    <select name="sort_by" className={classes.sort_by_droplist} onChange={props.onSort}>
                        <option value="None">None</option>
                        <option value="DroneIDUp">Drone ID &#8593;</option>
                        <option value="DroneIDDown">Drone ID &#8595;</option>
                        <option value="RadiusUp">Radius &#8593;</option>
                        <option value="RadiusDown">Radius &#8595;</option>
                        <option value="ZipcodeUp">Zipcode &#8593;</option>
                        <option value="ZipcodeDown">Zipcode &#8595;</option>
                        <option value="StatusUp">Status &#8593;</option>
                        <option value="StatusDown">Status &#8595;</option>
                    </select>
                    <button className={classes.btn_filter} onClick={props.onFilter}>Filter</button>
                </div>
                <ul className={classes.header_row}>
                    <li className={classes.drone_id_header}>Drone ID</li>
                    <li className={classes.operator_header}>Operator</li>
                    <li className={classes.radius_header}>Radius</li>
                    <li className={classes.zip_header}>Zipcode</li>
                    <li className={classes.status_header}>Status</li>

                </ul>
                <div className={classes.displayed_drones_container}>
                    {dronesEntries}
                </div>
                <button className={classes.btn_back}>
                    <Link className={classes.link_back} to="/home">Back</Link>
                </button>
                <button className={classes.btn_reset} onClick={props.onReset}>Reset</button>
            </div>
        </div>
    );
};

export default ViewDronesPage;