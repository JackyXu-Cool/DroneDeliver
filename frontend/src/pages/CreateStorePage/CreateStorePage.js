import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry/Entry";
import states from "../../assets/states";

import classes from "./CreateStorePage.module.scss";

const CreateStorePage = (props) => {

    const [chains, setChains] = useState([]);

    useEffect(() => {
        async function fetchChains() {
            let response = await fetch("http://localhost:5000/admin/get/chains");
            response = await response.json();
            setChains(response["chainList"]);
        }
        fetchChains();
    }, []);

    return (
        <div className={classes.CreateStorePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create New Store</h1>
                <div className={classes.entrybox}>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Affiliated Grocery Chain: </h2>
                        <Dropdown 
                            className={classes.right_entry_input} 
                            name={"chainName"} 
                            options={chains}
                            values={chains[0]}
                            onChange={props.onCreateStore}
                        />
                    </div>
                    <Entry 
                        text={"Grocery Store Location Name"}
                        name="storeName"
                        type="text"
                        onChange={props.onCreateStore}
                    />
                    <Entry
                        text={"Street"}
                        name="street"
                        type="text"
                        onChange={props.onCreateStore}
                    />
                    <Entry
                        text={"City"}
                        name="city"
                        type="text"
                        onChange={props.onCreateStore}
                    />
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>States: </h2>
                        <Dropdown 
                            name={"state"} 
                            className={classes.right_entry_input} 
                            options={states}
                            onChange={props.onCreateStore}
                            value={states[0]} 
                        />
                    </div>
                    <Entry
                        text={"ZIP"}
                        name="zipcode"
                        type="text"
                        onChange={props.onCreateStore}
                    />
                </div>

                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={props.createStore}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateStorePage;