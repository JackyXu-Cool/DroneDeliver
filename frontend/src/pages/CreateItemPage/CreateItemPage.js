import React from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry/Entry";
import types from "../../assets/types";

import classes from "./CreateItemPage.module.scss";

const CreateItemPage = (props) => {

    return (
        <div className={classes.CreateItemPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create Item</h1>
                <div className={classes.entrybox}>
                    <Entry 
                        text={"Name: "}
                        name="itemName"
                        type="text"
                        onChange={props.onCreateItem}
                    />
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Type: </h2>
                        <Dropdown 
                            name={"type"} 
                            className={classes.right_entry_input} 
                            options={types}
                            value={types[0]} 
                            onChange={props.onCreateItem}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Organic: </h2>
                        <Dropdown 
                            name={"organic"} 
                            className={classes.right_entry_input} 
                            options={["Yes", "No"]}
                            value={"Yes"} 
                            onChange={props.onCreateItem}
                        />
                    </div>
                    <Entry 
                        text={"Origin: "}
                        name="origin"
                        type="text"
                        onChange={props.onCreateItem}
                    />
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={props.submitCreateNewItem}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateItemPage;