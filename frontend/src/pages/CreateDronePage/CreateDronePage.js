import React, { useState, useEffect, useCallback } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry/Entry";

import classes from "./CreateDronePage.module.scss";

const CreateDronePage = (props) => {

    const [droneID, setDroneID] = useState(0);
    const [zipcodes, setZipcodes] = useState([]);

    useEffect(() => {
        async function fetchInfo() {
            let response = await fetch("http://localhost:5000/admin/get/droneid");
            response = await response.json();
            setDroneID(response["id"]);

            response = await fetch("http://localhost:5000/admin/get/zipcode");
            response = await response.json();
            setZipcodes(response["result"]);
        };
        fetchInfo();
    }, []);

    return (
        <div className={classes.CreateDronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create Drone</h1>
                <div className={classes.entrybox}>
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Drone ID: </h2>
                        <input
                            className={classes.input}
                            name={"id"}
                            type={"text"}
                            value={droneID}
                            disabled={true}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Associated Zip Code: </h2>
                        <Dropdown 
                            name={"zipcode"} 
                            className={classes.right_entry_input} 
                            options={zipcodes}
                            value={zipcodes[0]}
                        />
                    </div>
                    <Entry 
                        text={"Radius: "}
                        name="radius"
                        type="text"
                    />
                     <div className={classes.entry}>
                        <h2 className={classes.label}>Status: </h2>
                        <input
                            className={classes.input}
                            name={"status"}
                            type={"text"}
                            value={"Available"}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDronePage;