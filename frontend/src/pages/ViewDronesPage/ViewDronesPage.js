import React from "react";
import { Link } from "react-router-dom";

import TableHeaderRow from "../../components/TableHeaderRow/TableHeaderRow"
import TableEntryRow from "../../components/TableEntryRow/TableEntryRow"

import classes from "./ViewDronesPage.module.scss";

const ViewDronesPage = (props) => {
    const dronesEntries = props.displayedDrones.map((entry, index) => {
        return (        
        <TableEntryRow 
            key={index}
            index={index}
            entry_1={entry["ID"]}
            entry_2={entry["DroneTech"]}
            entry_3={entry["Radius"]}
            entry_4={entry["Zip"]}
            entry_5={entry["DroneStatus"]}
        />
        );
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
                <TableHeaderRow 
                    header_1="Drone ID"
                    header_2="Operator"
                    header_3="Radius"
                    header_4="Zipcode"
                    header_5="Status"
                />
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