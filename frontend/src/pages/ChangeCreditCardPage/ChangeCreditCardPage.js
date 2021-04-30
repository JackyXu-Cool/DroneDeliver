import React from "react";
import { Link } from "react-router-dom";

import classes from "./ChangeCreditCardPage.module.scss";

const ChangeCreditCardPage = (props) => {
    const entries = [
        ["Username: ", "username"],
        ["First Name: ", "firstName"],
        ["Last Name: ", "lastName"],
        ["Credit Card Number: ", "ccNumber"],
        ["Security Code: ", "cvv"],
        ["Expiration Date: ", "exp_date"]
    ];

    const form = entries.map((entry) => {
        return (
            <div className={classes.entry_row} key={entry[1]}>
                <h3 className={classes.entry_label}>{entry[0]}</h3>
                <input 
                    className={classes.entry_input}
                    name={entry[1]}
                    type={entry[1] === "cvv" ? "password" : "text"}
                    onChange={props.onEnter}
                    disabled={entry[1] === 'username' || entry[1] === "firstName" || entry[1] === "lastName"}
                    placeholder = {entry[1] === "username" ? props.username : 
                    (entry[1] === "firstName" ? props.firstname : 
                    (entry[1] === "lastName" ? props.lastname : 
                    (entry[1] === 'exp_date' ? "YYYY-MM-DD" : ""
                    )))}
                />
            </div>
        );
    });

    return (
        <div className={classes.ChangeCreditCardPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>Change Credit Card Information</h1>
                <div>
                    {form}
                </div>
                <div className={classes.btn_row}>
                    <button className={classes.btn_back}>
                        <Link className={classes.link_back} to="/home">Back</Link>
                    </button>
                    <button className={classes.btn_submit} onClick={props.onSubmit}>
                        <Link className={classes.link_submit} to='/customer/changeCCInfo'>Confirm</Link>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default ChangeCreditCardPage;