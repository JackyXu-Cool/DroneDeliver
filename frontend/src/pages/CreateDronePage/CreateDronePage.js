import React from "react";
import {Link} from "react-router-dom";
import Entry from "../../components/Entry/Entry";

import classes from "./CreateDronePage.module.scss";

const CreateDronePage = (props) => {
    return (
        <div className={classes.CreateDronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create Drone</h1>
                <div className={classes.entrybox}>
                    <Entry 
                        text={"Radius: "}
                        name="radius"
                        type="text"
                    />
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