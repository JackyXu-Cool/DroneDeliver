import React from "react";
import { Link } from "react-router-dom";
import Entry from "../../components/Entry/Entry";

import classes from "./CreateGroceryChainPage.module.scss";

const CreateGroceryChainPage = (props) => {
    return (
        <div className={classes.CreateGroceryChainPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create Grocery Chain</h1>
                <div className={classes.entrybox}>
                    <Entry 
                        text={"Grocery Chain Name: "}
                        name="chainName"
                        type="text"
                        onChange={props.onCreateChainHandler}
                    />
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={props.createChain}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateGroceryChainPage;