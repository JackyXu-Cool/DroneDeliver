import React from "react";
import { Link } from "react-router-dom";

import classes from "./ViewOrderHistoryPage.module.scss";

const ViewOrderHistoryPage = (props) => {
    let order_ids = props.orderIDs.map((entry) => {
        return (<option key={entry} value={entry}>{entry}</option>);
    })

    return (
        <div className={classes.ViewOrderHistoryPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>View Order History</h1>
                <div className={classes.row}>
                    <h2 className={classes.label}>Username: </h2>
                    <input className={classes.entry} value={props.username} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Order ID: </h2>
                    <select className={classes.droplist} name="order_id" onChange={props.onSelect}>{order_ids}</select>
                </div>


                <div className={classes.row}>
                    <h2 className={classes.label}>Total Amount: </h2>
                    <input className={classes.entry} value={props.orderInfo.total_amount} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Total Items: </h2>
                    <input className={classes.entry} value={props.orderInfo.total_items} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Date of Purchase: </h2>
                    <input className={classes.entry} value={props.orderInfo.orderdate} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Drone ID: </h2>
                    <input className={classes.entry} value={props.orderInfo.droneID} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Store Associate: </h2>
                    <input className={classes.entry} value={props.orderInfo.dronetech} disabled/>
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Status: </h2>
                    <input className={classes.entry} value={props.orderInfo.orderstatus} disabled/>
                </div>
                <button className={classes.btn_back}>
                    <Link className={classes.link_back} to="/home">Back</Link>
                </button>
            </div>
        </div>
    );
};

export default ViewOrderHistoryPage;